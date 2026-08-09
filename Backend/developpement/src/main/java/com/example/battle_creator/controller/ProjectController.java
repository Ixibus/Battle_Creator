package com.example.battle_creator.controller;

import com.example.battle_creator.dto.ProjectDto;
import com.example.battle_creator.model.Project;
import com.example.battle_creator.repository.ProjectRepository;
import com.example.battle_creator.service.ProjectService;

import jakarta.validation.Valid;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/projects")
@CrossOrigin(
    origins = "http://localhost:5173",
    maxAge = 3600
)
public class ProjectController {

    private final ProjectService projectService;
    private final ProjectRepository projectRepository;

    public ProjectController(
        ProjectService projectService,
        ProjectRepository projectRepository
    ) {
        this.projectService = projectService;
        this.projectRepository = projectRepository;
    }

    @GetMapping
    public ResponseEntity<List<Project>> getAllProjects() {
        return ResponseEntity.ok(projectService.getAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Project> getProjectById(
        @PathVariable Long id
    ) {
        return projectService.getById(id)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<?> createProject(
        @Valid @RequestBody ProjectDto projectDto
    ) {
        String projectName = cleanText(projectDto.getProjectName());

        boolean isExistingProjectName =
            projectRepository.existsByName(projectName);

        if (
            projectDto.getProjectDate() == null ||
            projectDto.getProjectDate().isBefore(LocalDate.now())
        ) {
            Map<String, String> response = new HashMap<>();

            response.put(
                "error",
                "PROJECT_DATE_IN_PAST"
            );

            response.put(
                "message",
                "La date du projet ne peut pas être antérieure à aujourd'hui."
            );

            return ResponseEntity
                .status(HttpStatus.BAD_REQUEST)
                .body(response);
        }


        if (isExistingProjectName) {
            Map<String, String> response = new HashMap<>();

            response.put(
                "error",
                "PROJECT_NAME_ALREADY_USED"
            );

            response.put(
                "message",
                "Un projet possède déjà ce nom."
            );

            return ResponseEntity
                .status(HttpStatus.BAD_REQUEST)
                .body(response);
        }

        Project createdProject = projectService.create(projectDto);

        return ResponseEntity
            .status(HttpStatus.CREATED)
            .body(createdProject);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateProject(
        @PathVariable Long id,
        @Valid @RequestBody ProjectDto projectDto
    ) {
        String projectName = cleanText(projectDto.getProjectName());

        boolean isExistingProjectName =
            projectRepository.existsByNameAndIdNot(projectName, id);

        if (
            projectDto.getProjectDate() == null ||
            projectDto.getProjectDate().isBefore(LocalDate.now())
        ) {
            Map<String, String> response = new HashMap<>();

            response.put(
                "error",
                "PROJECT_DATE_IN_PAST"
            );

            response.put(
                "message",
                "La date du projet ne peut pas être antérieure à aujourd'hui."
            );

            return ResponseEntity
                .status(HttpStatus.BAD_REQUEST)
                .body(response);
        }

    
        if (isExistingProjectName) {
            Map<String, String> response = new HashMap<>();

            response.put(
                "error",
                "PROJECT_NAME_ALREADY_USED"
            );

            response.put(
                "message",
                "Un projet possède déjà ce nom."
            );

            return ResponseEntity
                .status(HttpStatus.BAD_REQUEST)
                .body(response);
        }

        Project updatedProject = projectService.update(id, projectDto);

        return ResponseEntity.ok(updatedProject);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProject(
        @PathVariable Long id
    ) {
        projectService.delete(id);

        return ResponseEntity.noContent().build();
    }

    private String cleanText(String text) {
        return text.trim().replaceAll("\\s+", " ");
    }
}