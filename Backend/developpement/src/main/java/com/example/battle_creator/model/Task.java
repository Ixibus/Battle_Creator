package com.example.battle_creator.model;

import jakarta.persistence.*;

@Entity
@Table(name = "tasks")
public class Task {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "task_name", length = 255, nullable = false)
    private String taskName;

    @Column(name= "task_description", length = 255, nullable = true)
    private String taskDescription;

    @Column(name = "is_leader", nullable = false)
    private Boolean isLeader;

    @Column(name = "is_done", nullable = false)
    private Boolean isDone;

    @Column(name = "number_task_position", nullable = true)
    private Integer numberTaskPosition;

    @ManyToOne(optional = false)
    @JoinColumn(name = "id_mission", nullable = false)
    private Mission mission;

    @ManyToOne(optional = true) // relation facultative
    @JoinColumn(name = "id_member", nullable = true)
    private Member member;

    public Task() {};

//    // 7. Constructeur pratique si pas DTO d'installé dans le controller et le service avec ses methodes
//    public Task(String name, Boolean isLeader, Boolean isDone, Integer numberTaskPosition) {
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

    public String getTaskName() {
        return taskName;
    }

    public void setTaskName(String taskName) {
        this.taskName = taskName;
    }

    public String getTaskDescription() {
        return taskDescription;
    }

    public void setTaskDescription(String taskDescription) {
        this.taskDescription = taskDescription;
    }

    public Boolean isLeader() {
        return isLeader;
    }

    public void setLeader(Boolean isLeader) {
        this.isLeader = isLeader;
    }

    public Boolean isDone() {
        return isDone;
    }

    public void setDone(Boolean isDone) {
        this.isDone = isDone;
    }

    public Integer getNumberTaskPosition() {
        return numberTaskPosition;
    }

    public void setNumberTaskPosition(Integer numberTaskPosition) {
        this.numberTaskPosition = numberTaskPosition;
    }

    public Mission getMission() {
        return mission;
    }

    public void setMission(Mission mission) {
        this.mission = mission;
    }

    public Member getMember() {
        return member;
    }

    public void setMember(Member member) {
        this.member = member;
    }
}
