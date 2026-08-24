package com.example.battle_creator.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.time.LocalDate;

public class ProjectDto {

    @NotBlank(message = "Le nom du projet est obligatoire.")
    @Size(
        max = 100,
        message = "Le nom du projet ne doit pas dépasser 100 caractères."
    )
    private String projectName;

    @JsonProperty("projectLocation")
    @NotBlank(message = "Le lieu est obligatoire")
    @Size(
        max = 100,
        message = "Le nom du lieu ne doit pas dépasser 100 caractères."
    )
    private String projectLocation;

    @NotNull(message = "La date du projet est obligatoire.")
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate projectDate;

    @NotBlank(message = "La description du projet est obligatoire.")
    private String projectDescription;

    private Long ownerId;

    public ProjectDto() {
    }

    public ProjectDto(
        String projectName,
        String projectLocation,
        LocalDate projectDate,
        String projectDescription,
        Long ownerId
    ) {
        this.projectName = projectName;
        this.projectLocation = projectLocation;
        this.projectDate = projectDate;
        this.projectDescription = projectDescription;
        this.ownerId = ownerId;
    }

    public String getProjectName() {
        return projectName;
    }

    public void setProjectName(String projectName) {
        this.projectName = projectName;
    }

    public String getProjectLocation() { 
        return projectLocation; 
    }

    public void setProjectLocation(String projectLocation) { 
        this.projectLocation = projectLocation; 
    }

    public LocalDate getProjectDate() {
        return projectDate;
    }

    public void setProjectDate(LocalDate projectDate) {
        this.projectDate = projectDate;
    }

    public String getProjectDescription() {
        return projectDescription;
    }

    public void setProjectDescription(String projectDescription) {
        this.projectDescription = projectDescription;
    }

    public Long getOwnerId() {
        return ownerId;
    }

    public void setOwnerId(Long ownerId) {
        this.ownerId = ownerId;
    }

}