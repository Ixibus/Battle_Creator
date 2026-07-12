package com.example.battle_creator.repository;

import com.example.battle_creator.model.Task;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface TaskRepository extends JpaRepository<Task, Long> {

    // "méthode" pour chercher toutes les tâches en fonction d'une mission (clé étrangère). Renvoi dans l'ordre croissant des id de task
        List<Task> findByMissionIdOrderByIdAsc(Long missionId);


    // chercher toutes les tâches en fonction d'une mission tel que, sans se préoccuper de l'ordre renvoyé
        List<Task> findByMissionId(Long missionId);

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