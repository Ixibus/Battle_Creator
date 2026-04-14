package com.example.battle_creator.repository;

import com.example.battle_creator.model.Task;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface TaskRepository extends JpaRepository<Task, Long> {

// // Exemple de méthode à rajouter dans un repository

//    // Trouve toutes les tâches non terminées
//    List<Task> findByIsDoneFalse();
//
//    // Trouve les tâches d'un leader
//    List<Task> findByIsLeaderTrue();
//
//    // Trouve par nom (partiel)
//    List<Task> findByNameContainingIgnoreCase(String name);
//
//    // Compte les tâches terminées
//    @Query("SELECT COUNT(t) FROM Task t WHERE t.isDone = true")
//    long countDoneTasks();
}