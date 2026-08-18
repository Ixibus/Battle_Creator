package com.example.battle_creator.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import com.fasterxml.jackson.annotation.JsonProperty;



public class UserCreateDto {

    @NotBlank
    @Size(max = 255)
    private String email;

    @NotBlank
    @Size(max = 100)
    private String login;

    @NotBlank
    @JsonProperty("password")
    private String rawPassword;

    @NotNull
    private Boolean isActive;

    public UserCreateDto() {
    }

    public UserCreateDto(String email, String login, String rawPassword,Boolean isActive) {
        this.email = email;
        this.login = login;
        this.rawPassword = rawPassword;
        this.isActive = isActive;
    }

    public String getEmail() {
        return email;
    }

    public String getLogin() {
        return login;
    }

    public String getRawPassword() {return rawPassword ;};

    public Boolean getIsActive() {
        return isActive;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setLogin(String login) {
        this.login = login;
    }

    public void setRawPassword(String rawPassword) { this.rawPassword = rawPassword;}

    public void setIsActive(Boolean isActive) {
        this.isActive = isActive;
    }
}