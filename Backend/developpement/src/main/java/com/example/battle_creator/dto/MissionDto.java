package com.example.battle_creator.dto;

import com.example.battle_creator.model.Mission;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import com.fasterxml.jackson.annotation.JsonProperty;


public class MissionDto {

    private Long id;

    @NotNull(message = "merci de choisir un type")
    private Mission.MissionType type;

    @NotNull(message = "merci de préciser si la mission est par défaut ou non")
    private Boolean isDefault;

    @NotBlank(message = "merci de renseigner un nom")
    @Size(max = 100, message = "le nom ne doit pas dépasser 100 caractères")
    @JsonProperty("missionName")
    private String name;

    @NotBlank(message = "merci de renseigner un but")
    @Size(max = 255, message = "le but ne doit pas dépasser 255 caractères")
    @JsonProperty("missionGoal")
    private String goal;

    @JsonProperty("missionDescription")
    private String description;

    public MissionDto(){};

    public MissionDto(Long id, Mission.MissionType type, boolean isDefault, String name, String goal, String description) {
        this.id = id;
        this.type = type;
        this.isDefault = isDefault;
        this.name = name;
        this.goal = goal;
        this.description = description;
    }

    public Long getId() {
        return this.id;
    }
    public Mission.MissionType getType() {
        return this.type;
    }
    public Boolean getIsDefault() {
        return this.isDefault;
    }
    public String getName() {
        return this.name;
    }
    public String getGoal() {
        return this.goal;
    }
    public String getDescription() {
        return this.description;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setType(Mission.MissionType type) {
        this.type = type;
    }

    public void setIsDefault(Boolean isDefault) {
        this.isDefault = isDefault;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setGoal(String goal) {
        this.goal = goal;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}

