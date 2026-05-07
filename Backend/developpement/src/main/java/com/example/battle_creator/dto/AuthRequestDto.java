package com.example.battle_creator.dto;

public class AuthRequestDto {
    private String login;
    private String rawPassword;

    public String getLogin() { return login; }
    public void setLogin(String login) { this.login = login; }

    public String getRawPassword() { return rawPassword; }
    public void setRawPassword(String rawPassword) { this.rawPassword = rawPassword; }
}