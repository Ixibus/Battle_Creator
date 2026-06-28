package com.example.battle_creator.service;

import com.example.battle_creator.dto.TaskDto;
import com.example.battle_creator.model.Mission;
import com.example.battle_creator.model.Task;
import com.example.battle_creator.repository.MissionRepository;
import com.example.battle_creator.repository.TaskRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;


@Service
public class TaskService {

    private final TaskRepository taskRepository;
    private final MissionRepository missionRepository;

    public TaskService( TaskRepository taskRepository, MissionRepository missionRepository) {

        this.taskRepository = taskRepository;
        this.missionRepository = missionRepository;

    }

    public List<Task> getAll() { return taskRepository.findAll();}

    public Optional<Task> getById(Long id) {
        validateId(id);

        return taskRepository.findById(id);
    }

    public List<Task> getByMissionId(Long missionId) {
        validateId(missionId);
        return taskRepository.findByMissionId(missionId);
    }

    @Transactional
    public Task create(TaskDto taskDto) {
        validateTask(taskDto);

        Mission mission = missionRepository.findById(taskDto.getIdMission())
                .orElseThrow(() -> new IllegalArgumentException("mission introuvable"));

        Task taskCreated = new Task();
        taskCreated.setTaskName(cleanText(taskDto.getTaskName()));
        taskCreated.setTaskDescription(cleanText(taskDto.getTaskDescription()));
        taskCreated.setLeader(taskDto.isLeader());
        taskCreated.setDone(taskDto.isDone());
        taskCreated.setNumberTaskPosition(taskDto.getNumberTaskPosition());
        taskCreated.setMission(mission);

        return taskRepository.save(taskCreated);
    }

    @Transactional
    public Task update(TaskDto taskDto, Long id) {
        validateId(id);
        validateTask(taskDto);

        Mission mission = missionRepository.findById(taskDto.getIdMission())
                .orElseThrow(() -> new IllegalArgumentException("mission introuvable"));

        Task taskUpdated = taskRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("cette id est introuvable"));

        taskUpdated.setTaskName(cleanText(taskDto.getTaskName()));
        taskUpdated.setTaskDescription(cleanText(taskDto.getTaskDescription()));
        taskUpdated.setLeader(taskDto.isLeader());
        taskUpdated.setDone(taskDto.isDone());
        taskUpdated.setNumberTaskPosition(taskDto.getNumberTaskPosition());
        taskUpdated.setMission(mission);

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
        if (taskDto.getTaskName() == null || taskDto.getTaskName().trim().isEmpty() ) {
            throw  new IllegalArgumentException("il faut renseigner un nom");
        }
    }

    private String cleanText(String text){
        return text.trim().replaceAll("\\s+", " ");
    }
}
