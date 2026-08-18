package com.example.battle_creator.mapper;

import com.example.battle_creator.dto.MissionDto;
import com.example.battle_creator.model.Mission;
import com.example.battle_creator.model.Project;
import com.example.battle_creator.repository.ProjectRepository;


public class MissionMapper {
    public static void mapDtoToEntity(MissionDto dto, Mission mission, ProjectRepository projectRepository) {
        mission.setType(dto.getType());
        mission.setIsDefault(dto.getIsDefault());
        mission.setName(cleanText(dto.getName()));
        mission.setGoal(cleanText(dto.getGoal()));

        if (dto.getDescription() != null && !dto.getDescription().isBlank()) {
            mission.setDescription(cleanText(dto.getDescription()));
        } else {
            mission.setDescription(null);
        }

        // Association au Projet si le projectId est fourni dans le DTO
        if (dto.getProjectId() != null) {
            Project project = projectRepository.findById(dto.getProjectId()).orElseThrow(() -> new IllegalArgumentException("Projet introuvable pour l'ID : " + dto.getProjectId()));
            mission.setProject(project);
        } else {
            mission.setProject(null);
        }
    }

        private static String cleanText(String text) {
        return text.trim().replaceAll("\\s+", " ");
    }
}

