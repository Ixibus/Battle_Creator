package com.example.battle_creator.repository;

import com.example.battle_creator.model.Project;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProjectRepository extends JpaRepository<Project, Long> {

    boolean existsByName(String name);

    boolean existsByNameAndIdNot(String name, Long id);
}