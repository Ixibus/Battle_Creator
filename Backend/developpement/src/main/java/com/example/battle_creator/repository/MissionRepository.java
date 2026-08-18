package com.example.battle_creator.repository;

import com.example.battle_creator.model.Mission;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MissionRepository extends JpaRepository<Mission, Long> {
    List<Mission> findByProjectId(Long projectId);
}


// ----- Rappel Méthode JpaRepository -----

//     Project save(Project project);

//     Optional<Project> findById(Long id);

//     List<Project> findAll();

//     Project update(Project project); <-- inacessible quand JPAREpository est utilisé. Il faut prendre save() à la place

//     void deleteById(Long id);