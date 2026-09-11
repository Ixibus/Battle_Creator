package com.example.battle_creator.repository;

import com.example.battle_creator.model.Task;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface TaskRepository extends JpaRepository<Task, Long> {

        List<Task> findByMissionIdOrderByIdAsc(Long missionId);

        List<Task> findByMissionId(Long missionId);

}