package com.example.battle_creator.service;

import com.example.battle_creator.model.Mission;
import com.example.battle_creator.dto.MissionDto;
import com.example.battle_creator.repository.MissionRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class MissionService {

    private final MissionRepository missionRepository;


    public MissionService(MissionRepository missionRepository) {
        this.missionRepository = missionRepository;
    }


    public List<Mission> getAll() {
        return missionRepository.findAll();
    }

    public Optional<Mission> getById(Long id) {
        validateId(id);

        return missionRepository.findById(id);
    }

    @Transactional
    public Mission create(MissionDto missionDto) {

        validateMissionDto(missionDto);

        Mission mission = new Mission();
        mission.setName(cleanText(missionDto.getName()));
        mission.setGoal(cleanText(missionDto.getGoal()));

        if (missionDto.getDescription() != null && !missionDto.getDescription().isBlank()) {
          mission.setDescription(cleanText(missionDto.getDescription()));
        } else {
            mission.setDescription(null);
        };

        return missionRepository.save(mission);
    }

    @Transactional
    public Mission update(Long id, MissionDto missionDto) {
        validateId(id);
        validateMissionDto(missionDto);

        Mission existingMission = missionRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("L'id de la mission est introuvable"));

        existingMission.setType(missionDto.getType());
        existingMission.setIsDefault(missionDto.getIsDefault());
        existingMission.setName(cleanText(missionDto.getName()));
        existingMission.setGoal(cleanText(missionDto.getGoal()));

        if (missionDto.getDescription() != null && !missionDto.getDescription().isBlank()) {
            existingMission.setDescription(cleanText(missionDto.getDescription()));
        } else {
            existingMission.setDescription(null);
        }

        return missionRepository.save(existingMission);
    }

    @Transactional
    public void delete(Long id) {
        validateId(id);

        if(!missionRepository.existsById(id)) {
            throw new IllegalArgumentException("l'id de la mission est introuvable");
        }

        missionRepository.deleteById(id);
    }

    private void validateId(Long id) {
        if (id == null || id <= 0) {
            throw new IllegalArgumentException("l'id doit être positif.");
        }
    }

    private void validateMissionDto(MissionDto missionDto) {
        if (missionDto == null) {
            throw new IllegalArgumentException("la mission n'est pas renseigné");
        }
        if (missionDto.getType() == null) {
            throw new IllegalArgumentException("le type de la mission n'est pas renseigné");
        }
        if (missionDto.getName() == null || missionDto.getName().isBlank()) {
            throw new IllegalArgumentException("le nom de la mission n'est pas renseigné");
        }
        if (missionDto.getGoal() == null || missionDto.getGoal().isBlank()) {
            throw new IllegalArgumentException("le but de la mission n'est pas renseigné");
        }
    }

    private String cleanText(String text) {
        return text.trim().replaceAll("\\s+", " ");
    }

}
