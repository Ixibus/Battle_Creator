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


    @GetMapping("/user/{ownerId}")
    public ResponseEntity<List<Project>> getProjectsByOwnerId(@PathVariable Long ownerId) {
        List<Project> projects = projectService.getByOwnerId(ownerId);
        return ResponseEntity.ok(projects);
    }

    @PostMapping
    public ResponseEntity<?> createProject(
        @Valid @RequestBody ProjectDto projectDto
    ) {
        try {
            if (projectDto.getOwnerId() == null) {
                return errorResponse(
                    HttpStatus.BAD_REQUEST,
                    "OWNER_ID_REQUIRED",
                    "L'identifiant du compte est obligatoire."
                );
            }

            User owner = userRepository.findById(
                projectDto.getOwnerId()
            ).orElse(null);

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

            // Construction de la réponse pour éviter les boucles JSON
            Map<String, Object> response = new HashMap<>();
            response.put("id", createdProject.getId());
            response.put("projectName", createdProject.getName());
            response.put("projectLocation", createdProject.getLocation());
            response.put("projectDate", createdProject.getProjectDate());
            response.put("projectDescription", createdProject.getDescription());
            response.put("ownerId", owner.getId());

            return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(response);

        } catch (Throwable e) {
            // C'EST CETTE LIGNE QUI FORCE L'AFFICHAGE ROUGE DANS VOTRE TERMINAL
            e.printStackTrace();

            Map<String, String> errorDetails = new HashMap<>();
            errorDetails.put("error", e.getClass().getSimpleName());
            errorDetails.put("message", e.getMessage() != null ? e.getMessage() : "Aucun message d'erreur");

            return ResponseEntity
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(errorDetails);
        }
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
        if (text == null) return "";
        return text.trim().replaceAll("\\s+", " ");
    }
}