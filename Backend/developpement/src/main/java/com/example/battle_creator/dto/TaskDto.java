package com.example.battle_creator.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import com.fasterxml.jackson.annotation.JsonProperty;

public class TaskDto {

    private Long id;

    @NotBlank(message = "Le nom est obligatoire")
    @Size(max = 255, message = "Le nom ne doit pas dépasser 255 caractères")
    private String taskName;

    @Size(max = 255, message = "Le nom ne doit pas dépasser 255 caractères")
    private String taskDescription;

    @NotNull(message = "Le statut leader est obligatoire")
    @JsonProperty("isLeaderTaskCheckbox")
    private Boolean isLeader;

    @NotNull(message = "Le statut done est obligatoire")
    private Boolean isDone;

    private Integer numberTaskPosition;

    public TaskDto(){};

    public TaskDto(String taskName, String taskDescription, Boolean isLeader, Boolean isDone, Integer numberTaskPosition) {
        this.taskName = taskName;
        this.taskDescription = taskDescription;
        this.isLeader = isLeader;
        this.isDone = isDone;
        this.numberTaskPosition = numberTaskPosition;
    };

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

}