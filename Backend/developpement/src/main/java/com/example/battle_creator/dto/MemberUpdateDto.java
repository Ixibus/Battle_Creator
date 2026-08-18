package com.example.battle_creator.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import com.fasterxml.jackson.annotation.JsonProperty;



public class MemberUpdateDto {

    @NotNull
    private Long id;

    @NotBlank
    @Size(max = 50)
    private String firstName;

    @NotBlank
    @Size(max = 50)
    private String lastName;

    public MemberUpdateDto() {
    }

    public MemberUpdateDto(Long id, String firstName, String lastName) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
    }


    public Long getId() {
        return id;
    }

    public String getFirstName() {
        return firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }
}