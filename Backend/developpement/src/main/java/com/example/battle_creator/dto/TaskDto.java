package com.example.battle_creator.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public class TaskDto {

    private Long id;

    @NotBlank(message = "Le nom est obligatoire")
    @Size(max = 255, message = "Le nom ne doit pas dépasser 255 caractères")
    private String name;

    @NotNull(message = "Le statut leader est obligatoire")
    private Boolean isLeader;

    @NotNull(message = "Le statut done est obligatoire")
    private Boolean isDone;

    private Integer numberTaskPosition;

    public TaskDto(){};

    public TaskDto(String name, Boolean isLeader, Boolean isDone, Integer numberTaskPosition) {
        this.name = name;
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

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public boolean getIsLeader() {
        return isLeader;
    }

    public void setLeader(Boolean leader) {
        isLeader = leader;
    }

    public boolean getIsDone() {
        return isDone;
    }

    public void setDone(Boolean done) {
        isDone = done;
    }

    public Integer getNumberTaskPosition() {
        return numberTaskPosition;
    }

    public void setNumberTaskPosition(Integer numberTaskPosition) {
        this.numberTaskPosition = numberTaskPosition;
    }

}