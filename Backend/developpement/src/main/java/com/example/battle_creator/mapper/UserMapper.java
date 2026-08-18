package com.example.battle_creator.mapper;

import com.example.battle_creator.dto.UserCreateDto;
import com.example.battle_creator.dto.UserUpdateDto;
import com.example.battle_creator.model.User;

public class UserMapper {

    public static User toEntity(UserCreateDto dto) {
        if (dto == null) {
            return null;
        }

        User user = new User();
        user.setEmail(cleanText(dto.getEmail()));
        user.setLogin(cleanText(dto.getLogin()));
        user.setIsActive(dto.getIsActive());
        return user;
    }

    public static void updateEntity(User user, UserUpdateDto dto) {
        if (user == null || dto == null) {
            return;
        }

        user.setEmail(cleanText(dto.getEmail()));
        user.setLogin(cleanText(dto.getLogin()));
        user.setIsActive(dto.getIsActive());
    }

    public static UserUpdateDto toUpdateDto(User user) {
        if (user == null) {
            return null;
        }

        return new UserUpdateDto(
                user.getId(),
                user.getEmail(),
                user.getLogin(),
                user.getIsActive()
        );
    }

    private static String cleanText(String text) {
        return text == null ? null : text.trim().replaceAll("\\s+", " ");
    }
}