package com.example.battle_creator.controller;

import com.example.battle_creator.dto.TaskDto;
import com.example.battle_creator.dto.TaskResponseDto;
import com.example.battle_creator.dto.TaskMemberAssignmentDto;
import com.example.battle_creator.model.Task;
import com.example.battle_creator.service.TaskService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/tasks")
public class TaskController {

    private final TaskService taskService;

    public TaskController(TaskService taskService) {
        this.taskService = taskService;
    }

    @GetMapping
    public ResponseEntity<List<Task>> getAllTask() {
        return ResponseEntity.ok(taskService.getAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Task> getTaskById(@PathVariable Long id) {
        return ResponseEntity.of(taskService.getById(id));
        // avec cette méthode, ResponseEntity.of(Optional) renvoie directement 200 OK si l’objet existe, ou 404 Not Found s’il est absent
    }

    // @GetMapping("/mission/{missionId}")
    // public ResponseEntity<List<Task>> getTasksByMissionId(@PathVariable Long missionId) {
    //     return ResponseEntity.ok(taskService.getByMissionId(missionId));
    // }

    @GetMapping("/mission/{missionId}")
    public List<TaskResponseDto> getTasksByMission(@PathVariable Long missionId) {
    return taskService.getByMissionIdWithMember(missionId);
}

    @PostMapping
    public ResponseEntity<Task> createTask(@RequestBody TaskDto taskDto) {
        Task createdTask = taskService.create(taskDto);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdTask);
    }

    @PutMapping("/{taskId}")
    public ResponseEntity<Void> assignMemberToTask(@PathVariable Long taskId, @RequestBody TaskMemberAssignmentDto taskMemberAssignmentDto) {
        taskService.assignMemberToTask(taskId, taskMemberAssignmentDto.getMemberId());
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTask(@PathVariable Long id) {
        taskService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
