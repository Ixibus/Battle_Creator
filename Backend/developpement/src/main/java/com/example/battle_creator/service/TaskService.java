package com.example.battle_creator.service;

import com.example.battle_creator.dto.TaskDto;
import com.example.battle_creator.model.Task;
import com.example.battle_creator.repository.TaskRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;


@Service
public class TaskService {

    private final TaskRepository taskRepository;

    public TaskService( TaskRepository taskRepository) {
        this.taskRepository = taskRepository;
    }

    public List<Task> getAll() { return taskRepository.findAll();}

    public Optional<Task> getById(Long id) {
        validateId(id);

        return taskRepository.findById(id);
    }

    @Transactional
    public Task create(TaskDto taskDto) {
        validateTask(taskDto);

        Task taskCreated = new Task();
        taskCreated.setName(cleanText(taskDto.getName()));
        taskCreated.setLeader(taskDto.getIsLeader());
        taskCreated.setDone(taskDto.getIsDone());
        taskCreated.setNumberTaskPosition(taskDto.getNumberTaskPosition());

        return taskRepository.save(taskCreated);
    }

    @Transactional
    public Task update(TaskDto taskDto, Long id) {
        validateId(id);
        validateTask(taskDto);

        Task taskUpdated = taskRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("cette id est introuvable"));
        taskUpdated.setName(cleanText(taskDto.getName()));
        taskUpdated.setLeader(taskDto.getIsLeader());
        taskUpdated.setDone(taskDto.getIsDone());
        taskUpdated.setNumberTaskPosition(taskDto.getNumberTaskPosition());

        return taskRepository.save(taskUpdated);
    }

    @Transactional
    public void delete(Long id) {
        validateId(id);

        if (!taskRepository.existsById(id)) {
            throw new IllegalArgumentException("cette id est introuvable");
        }

        taskRepository.deleteById(id);
    }

    private void validateId(Long id) {
        if (id <= 0) {
            throw new IllegalArgumentException(" L'id doit être positif et différent de 0");
        }
    }

    private void validateTask(TaskDto taskDto) {
        if (taskDto == null) {
            throw new IllegalArgumentException("il faut renseigner une tache");
        }
        if (taskDto.getName() == null || taskDto.getName().trim().isEmpty() ) {
            throw  new IllegalArgumentException("il faut renseigner un nom");
        }
    }

    private String cleanText(String text){
        return text.trim().replaceAll("\\s+", " ");
    }
}
