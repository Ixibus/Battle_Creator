package com.example.battle_creator.controller;

import com.example.battle_creator.dto.UserCreateDto;
import com.example.battle_creator.dto.UserUpdateDto;
import com.example.battle_creator.model.User;
import com.example.battle_creator.service.UserService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "http://localhost:5173", maxAge = 3600)
public class Authentification {
    private final UserService userService;

    public Authentification(UserService userService) {
        this.userService = userService;
    }

    @PostMapping
    public ResponseEntity<User> createUser(@Valid @RequestBody UserCreateDto userCreateDto) {
        User userCreated = userService.create(userCreateDto);
        return ResponseEntity.status(HttpStatus.CREATED).body(userCreated);
    }

}