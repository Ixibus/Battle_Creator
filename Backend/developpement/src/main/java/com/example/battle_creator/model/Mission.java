package com.example.battle_creator.model;

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

    public Mission(){};

//    // Constructeur pratique si pas DTO d'installé dans le controller et le service avec ses methodes
//    public Mission(Long id, MissionType type, boolean isDefault, String name, String goal, String description){
//        this.id = id;
//        this.type = type;
//        this.isDefault = isDefault;
//        this.name = name;
//        this.goal = goal;
//        this.description = description;
//    };


    public Long getId(){
        return this.id;
    }

    public MissionType getType() {
        return this.type;
    }

    public boolean getIsDefault() {
        return this.isDefault;
    }

    public String getName(){
        return this.name;
    }

    public String getGoal(){
        return this.goal;
    }

    public String getDescription(){
        return this.description;
    }

    public void setId(Long id){ this.id = id;}
    public void setType(MissionType type){ this.type = type;}
    public void setIsDefault(boolean isDefault){ this.isDefault = isDefault;}
    public void setName(String name){ this.name = name;}
    public void setGoal(String goal){ this.goal = goal;}
    public void setDescription(String description){ this.description = description;}
}
