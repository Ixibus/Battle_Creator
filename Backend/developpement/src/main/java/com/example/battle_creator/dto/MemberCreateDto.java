package com.example.battle_creator.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;



public class MemberCreateDto {

    @NotBlank
    @Size(max = 50)
    private String firstName;

    @NotBlank
    @Size(max = 50)
    private String lastName;

    public MemberCreateDto() {
    }

    public MemberCreateDto(String firstName, String lastName) {
        this.firstName = firstName;
        this.lastName = lastName;
    }

    public String getFirstName() {
        return firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }
}