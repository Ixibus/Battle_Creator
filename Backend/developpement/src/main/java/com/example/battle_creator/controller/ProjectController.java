package com.example.battle_creator.controller;

import com.example.battle_creator.dto.ProjectDto;
import com.example.battle_creator.model.Project;
import com.example.battle_creator.model.User;
import com.example.battle_creator.repository.ProjectRepository;
import com.example.battle_creator.repository.UserRepository;
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
    private final UserRepository userRepository;

    public ProjectController(
        ProjectService projectService,
        ProjectRepository projectRepository,
        UserRepository userRepository
    ) {
        this.projectService = projectService;
        this.projectRepository = projectRepository;
        this.userRepository = userRepository;
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
        User owner = userRepository.findById(
            projectDto.getOwnerId()
        ).orElse(null);

        if (projectDto.getOwnerId() == null) {
            return errorResponse(
                HttpStatus.BAD_REQUEST,
                "OWNER_ID_REQUIRED",
                "L'identifiant du compte est obligatoire."
            );
        }

        if (owner == null) {
            return errorResponse(
                HttpStatus.BAD_REQUEST,
                "USER_NOT_FOUND",
                "Le compte propriétaire est introuvable."
            );
        }

        if (
            projectDto.getProjectDate() == null ||
            projectDto.getProjectDate().isBefore(LocalDate.now())
        ) {
            return errorResponse(
                HttpStatus.BAD_REQUEST,
                "PROJECT_DATE_IN_PAST",
                "La date du projet ne peut pas être antérieure à aujourd'hui."
            );
        }

        String projectName = cleanText(
            projectDto.getProjectName()
        );

        if (projectRepository.existsByName(projectName)) {
            return errorResponse(
                HttpStatus.BAD_REQUEST,
                "PROJECT_NAME_ALREADY_USED",
                "Un projet possède déjà ce nom."
            );
        }

        Project createdProject =
            projectService.create(projectDto, owner);

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

    private ResponseEntity<Map<String, String>> errorResponse(
        HttpStatus status,
        String error,
        String message
    ) {
        Map<String, String> response = new HashMap<>();

        response.put("error", error);
        response.put("message", message);

        return ResponseEntity
            .status(status)
            .body(response);
    }

    private String cleanText(String text) {
        return text.trim().replaceAll("\\s+", " ");
    }
}