package com.example.battle_creator.service;

import com.example.battle_creator.dto.ProjectDto;
import com.example.battle_creator.model.Project;
import com.example.battle_creator.model.User;
import com.example.battle_creator.repository.ProjectRepository;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class ProjectService {

    private final ProjectRepository projectRepository;

    public ProjectService(ProjectRepository projectRepository) {
        this.projectRepository = projectRepository;
    }

    @Transactional
    public Project create(
        ProjectDto projectDto,
        User owner
    ) {
        validateProjectDto(projectDto);

        if (owner == null) {
            throw new IllegalArgumentException(
                "Le propriétaire du projet est obligatoire."
            );
        }

        Project project = new Project();

        project.setName(
            cleanText(projectDto.getProjectName())
        );

        project.setProjectDate(
            projectDto.getProjectDate()
        );

        project.setDescription(
            cleanText(projectDto.getProjectDescription())
        );

        project.setOwner(owner);

        return projectRepository.save(project);
    }

    @Transactional
    public Project update(Long id, ProjectDto projectDto) {
        validateId(id);
        validateProjectDto(projectDto);

        Project existingProject = projectRepository.findById(id)
            .orElseThrow(() ->
                new IllegalArgumentException(
                    "Projet introuvable avec l'id : " + id
                )
            );

        existingProject.setName(
            cleanText(projectDto.getProjectName())
        );

        existingProject.setProjectDate(
            projectDto.getProjectDate()
        );

        existingProject.setDescription(
            cleanText(projectDto.getProjectDescription())
        );

        return projectRepository.save(existingProject);
    }

    public List<Project> getAll() {
        return projectRepository.findAll();
    }

    public Optional<Project> getById(Long id) {
        validateId(id);
        return projectRepository.findById(id);
    }

    @Transactional
    public void delete(Long id) {
        validateId(id);

        if (!projectRepository.existsById(id)) {
            throw new IllegalArgumentException(
                "Projet introuvable avec l'id : " + id
            );
        }

        projectRepository.deleteById(id);
    }

    private void validateProjectDto(ProjectDto projectDto) {
        if (projectDto == null) {
            throw new IllegalArgumentException(
                "Le projet ne peut pas être nul."
            );
        }

        if (
            projectDto.getProjectName() == null ||
            projectDto.getProjectName().trim().isEmpty()
        ) {
            throw new IllegalArgumentException(
                "Le nom du projet est obligatoire."
            );
        }

        if (projectDto.getProjectDate() == null) {
            throw new IllegalArgumentException(
                "La date du projet est obligatoire."
            );
        }

        if (
            projectDto.getProjectDescription() == null ||
            projectDto.getProjectDescription().trim().isEmpty()
        ) {
            throw new IllegalArgumentException(
                "La description du projet est obligatoire."
            );
        }

        if (projectDto.getOwnerId() == null) {
            throw new IllegalArgumentException(
            "Le compte propriétaire est obligatoire."
            );
        }
    }

    private void validateId(Long id) {
        if (id == null || id <= 0) {
            throw new IllegalArgumentException(
                "L'id doit être positif."
            );
        }
    }

    private String cleanText(String text) {
        return text.trim().replaceAll("\\s+", " ");
    }
}