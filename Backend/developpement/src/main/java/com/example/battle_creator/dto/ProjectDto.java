package com.example.battle_creator.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class ProjectDto {

    @NotBlank(message = "Le nom du projet est obligatoire.")
    @Size(max = 100, message = "Le nom du projet ne doit pas dépasser 100 caractères.")
    private String name;

    @NotBlank(message = "La description du projet est obligatoire.")
    private String description;

    public ProjectDto(){};

    public ProjectDto(String name, String description) {
        this.name = name;
        this.description = description;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}
