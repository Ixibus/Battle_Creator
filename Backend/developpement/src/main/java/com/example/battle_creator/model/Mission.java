package com.example.battle_creator.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

@Entity
@Table(name = "missions")
public class Mission {

    public enum MissionType {
        mandatory,
        option
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column(name = "type", length = 20, nullable = false)
    private MissionType type;

    @Column(name = "is_default")
    private boolean isDefault;

    @Column(name = "name", length = 100, nullable = false)
    private String name;

    @Column(name = "goal", length = 255, nullable = false)
    private String goal;

    @Column(name = "description")
    private String description;

    // Clé étrangère vers Project
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_project", foreignKey = @ForeignKey(name = "fk_missions_projects_id"))
    @JsonIgnore
    private Project project;

    public Mission() {}

    // Getters et Setters
    public Long getId() { return this.id; }
    public void setId(Long id) { this.id = id; }

    public MissionType getType() { return this.type; }
    public void setType(MissionType type) { this.type = type; }

    public boolean getIsDefault() { return this.isDefault; }
    public void setIsDefault(boolean isDefault) { this.isDefault = isDefault; }

    public String getName() { return this.name; }
    public void setName(String name) { this.name = name; }

    public String getGoal() { return this.goal; }
    public void setGoal(String goal) { this.goal = goal; }

    public String getDescription() { return this.description; }
    public void setDescription(String description) { this.description = description; }

    public Project getProject() { return this.project; }
    public void setProject(Project project) { this.project = project; }
}