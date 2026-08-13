package com.example.battle_creator.service;

import com.example.battle_creator.model.Mission;
import com.example.battle_creator.model.Project;
import com.example.battle_creator.dto.MissionDto;
import com.example.battle_creator.mapper.MissionMapper;
import com.example.battle_creator.repository.MissionRepository;
import com.example.battle_creator.repository.ProjectRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class MissionService {

    private final MissionRepository missionRepository;
    private final ProjectRepository projectRepository;


    public MissionService(MissionRepository missionRepository, ProjectRepository projectRepository) {
        this.missionRepository = missionRepository;
        this.projectRepository = projectRepository;
    }


    public List<Mission> getAll() {
        return missionRepository.findAll();
    }

    public Optional<Mission> getById(Long id) {
        validateId(id);
        return missionRepository.findById(id);
    }

    public List<Mission> getByProjectId(Long projectId) {
        validateId(projectId);
        return missionRepository.findByProjectId(projectId);
    }

    @Transactional
    public Mission create(MissionDto missionDto) {

        validateMissionDto(missionDto);

        Mission mission = new Mission();
        MissionMapper.mapDtoToEntity(missionDto, mission, projectRepository);

        return missionRepository.save(mission);
    }

    @Transactional
    public Mission update(Long id, MissionDto missionDto) {
        validateId(id);
        validateMissionDto(missionDto);

        Mission existingMission = missionRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("L'id de la mission est introuvable"));

        MissionMapper.mapDtoToEntity(missionDto, existingMission, projectRepository);

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

}
