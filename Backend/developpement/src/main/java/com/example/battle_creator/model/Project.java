package com.example.battle_creator.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

// // test de création de tablea : permet de vérifier que la connexion avce la BDD est ok
// @Entity // <--- INDISPENSABLE
// public class Geocache {
//     @Id
//     @GeneratedValue(strategy = GenerationType.IDENTITY)
//     private Long id;

//     private String name;
    
//     // Ajoute un constructeur vide (obligatoire pour JPA)
//     public Geocache() {}
// }

@Entity
@Table(name = "projects")
public class Project {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name", length = 100, nullable = false)
    private String name;

    @Column(name = "description", nullable = false)
    private String description;

    public Project() {};

//    // Constructeur pratique si pas DTO d'installé dans le controller et le service avec ses methodes
//    public Project(Long id, String name, String description) {
//        this.id = id;
//        this.name = name;
//        this.description = description;
//    }

    public Long getId() {
        return this.id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return this.name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return this.description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}