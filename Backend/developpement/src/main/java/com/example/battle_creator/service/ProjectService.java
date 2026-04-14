package com.example.battle_creator.service;

import com.example.battle_creator.dto.ProjectDto;
import com.example.battle_creator.model.Project;
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
    public Project create(ProjectDto projectDto) {
        validateProjectDto(projectDto);

        Project project = new Project();
        project.setName(cleanText(projectDto.getName()));
        project.setDescription(cleanText(projectDto.getDescription()));

        return projectRepository.save(project);
    }

    @Transactional
    public Project update(Long id, ProjectDto projectDto) {
        validateId(id);
        validateProjectDto(projectDto);

        Project existingProject = projectRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Projet introuvable avec l'id : " + id));

        existingProject.setName(cleanText(projectDto.getName()));
        existingProject.setDescription(cleanText(projectDto.getDescription()));

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
            throw new IllegalArgumentException("Projet introuvable avec l'id : " + id);
        }

        projectRepository.deleteById(id);
    }

    private void validateProjectDto(ProjectDto projectDto) {
        if (projectDto == null) {
            throw new IllegalArgumentException("Le projet ne peut pas être nul.");
        }
        if (projectDto.getName() == null || projectDto.getName().trim().isEmpty()) {
            throw new IllegalArgumentException("Le nom du projet est obligatoire.");
        }
        if (projectDto.getDescription() == null || projectDto.getDescription().trim().isEmpty()) {
            throw new IllegalArgumentException("La description du projet est obligatoire.");
        }
    }

    private void validateId(Long id) {
        if (id == null || id <= 0) {
            throw new IllegalArgumentException("L'id doit être positif.");
        }
    }

    private String cleanText(String text) {
        return text.trim().replaceAll("\\s+", " ");
    }
}


// // ----- Service corrigée dans "injection DTO" -----

// package com.example.battle_creator.service;

// import com.example.battle_creator.model.Project;
// import com.example.battle_creator.repository.ProjectRepository;
// import org.springframework.stereotype.Service;
// import org.springframework.transaction.annotation.Transactional;

// import java.util.List;
// import java.util.Optional;

// @Service
// public class ProjectService {

//     private final ProjectRepository projectRepository;

//     public ProjectService(ProjectRepository projectRepository) {
//         this.projectRepository = projectRepository;
//     }

//     @Transactional
//     public Project create(Project project) {
//         return projectRepository.save(project);
//     }

//     @Transactional
//     public Project update(Long id, Project project) {
//         validateId(id);

//         Project existingProject = projectRepository.findById(id)
//                 .orElseThrow(() -> new IllegalArgumentException("Projet introuvable avec l'id : " + id));

//         existingProject.setName(project.getName());
//         existingProject.setDescription(project.getDescription());

//         return projectRepository.save(existingProject);
//     }

//     public List<Project> getAll() {
//         return projectRepository.findAll();
//     }

//     public Optional<Project> getById(Long id) {
//         validateId(id);
//         return projectRepository.findById(id);
//     }

//     @Transactional
//     public void delete(Long id) {
//         validateId(id);

//         if (!projectRepository.existsById(id)) {
//             throw new IllegalArgumentException("Projet introuvable avec l'id : " + id);
//         }

//         projectRepository.deleteById(id);
//     }

//     private void validateId(Long id) {
//         if (id == null || id <= 0) {
//             throw new IllegalArgumentException("L'id doit être positif.");
//         }
//     }
// }

// // ----- Service plus détailé (+ inclus règle normalement dans le DTO) -----

// package com.example.battle_creator.service;

// import com.example.battle_creator.model.Project;
// import com.example.battle_creator.repository.ProjectRepository;
// import org.springframework.stereotype.Service;
// import org.springframework.transaction.annotation.Transactional;

// import java.util.List;
// import java.util.Optional;

// @Service
// public class ProjectService {

//     private final ProjectRepository projectRepository;

//     public ProjectService(ProjectRepository projectRepository) {
//         this.projectRepository = projectRepository;
//     }

//     @Transactional
//     public Project create(Project project) {
//         validateProjectForCreate(project);

//         String cleanName = cleanText(project.getName());
//         String cleanDescription = cleanText(project.getDescription());

//         project.setName(cleanName);
//         project.setDescription(cleanDescription);

//         return projectRepository.save(project);
//     }

//     @Transactional
//     public Project update(Long id, Project project) {
//         validateProjectForUpdate(id, project);

//         Project existingProject = projectRepository.findById(id)
//                 .orElseThrow(() -> new IllegalArgumentException("Projet introuvable avec l'id : " + id));

//         existingProject.setName(cleanText(project.getName()));
//         existingProject.setDescription(cleanText(project.getDescription()));

//         return projectRepository.save(existingProject);
//     }

//     public List<Project> getAll() {
//         return projectRepository.findAll();
//     }

//     public Optional<Project> getById(Long id) {
//         if (id == null || id <= 0) {
//             throw new IllegalArgumentException("L'id doit être positif.");
//         }
//         return projectRepository.findById(id);
//     }

//     @Transactional
//     public void delete(Long id) {
//         if (id == null || id <= 0) {
//             throw new IllegalArgumentException("L'id doit être positif.");
//         }

//         Project existingProject = projectRepository.findById(id)
//                 .orElseThrow(() -> new IllegalArgumentException("Projet introuvable avec l'id : " + id));

//         projectRepository.deleteById(existingProject.getId());
//     }

//     private void validateProjectForCreate(Project project) {
//         if (project == null) {
//             throw new IllegalArgumentException("Le projet ne peut pas être nul.");
//         }
//         if (project.getName() == null || project.getName().trim().isEmpty()) {
//             throw new IllegalArgumentException("Le nom du projet est obligatoire.");
//         }
//         if (project.getDescription() == null || project.getDescription().trim().isEmpty()) {
//             throw new IllegalArgumentException("La description du projet est obligatoire.");
//         }
//         if (project.getName().trim().length() > 100) {
//             throw new IllegalArgumentException("Le nom du projet ne doit pas dépasser 100 caractères.");
//         }
//     }

//     private void validateProjectForUpdate(Long id, Project project) {
//         if (id == null || id <= 0) {
//             throw new IllegalArgumentException("L'id doit être positif.");
//         }
//         validateProjectForCreate(project);
//     }

//     private String cleanText(String text) {
//         return text.trim().replaceAll("\\s+", " ");
//     }
// }