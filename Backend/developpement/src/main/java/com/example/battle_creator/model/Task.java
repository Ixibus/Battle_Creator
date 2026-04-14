package com.example.battle_creator.model;

import jakarta.persistence.*;

@Entity
@Table(name = "tasks")
public class Task {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name", length = 255, nullable = false)
    private String name;

    @Column(name = "is_leader", nullable = false)
    private boolean isLeader;

    @Column(name = "is_done", nullable = false)
    private boolean isDone;

    @Column(name = "number_tasks_position", nullable = true)
    private Integer numberTaskPosition;

    public Task() {};

//    // 7. Constructeur pratique si pas DTO d'installé dans le controller et le service avec ses methodes
//    public Task(String name, boolean isLeader, boolean isDone, Integer numberTaskPosition) {
//        this.name = name;
//        this.isLeader = isLeader;
//        this.isDone = isDone;
//        this.numberTaskPosition = numberTaskPosition;
//    };

    public Long getId() {
        return this.id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public boolean getIsLeader() {
        return isLeader;
    }

    public void setLeader(boolean leader) {
        isLeader = leader;
    }

    public boolean getIsDone() {
        return isDone;
    }

    public void setDone(boolean done) {
        isDone = done;
    }

    public Integer getNumberTaskPosition() {
        return numberTaskPosition;
    }

    public void setNumberTaskPosition(Integer numberTaskPosition) {
        this.numberTaskPosition = numberTaskPosition;
    }
}
