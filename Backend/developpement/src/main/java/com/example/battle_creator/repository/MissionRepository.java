package com.example.battle_creator.repository;

import com.example.battle_creator.model.Mission;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MissionRepository extends JpaRepository<Mission, Long> {
    List<Mission> findByProjectId(Long projectId);
}