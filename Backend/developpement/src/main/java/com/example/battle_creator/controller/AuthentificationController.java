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
public class AuthentificationController {

    private final User user;
    private final UserCredentials userCredentials;

    public AuthentificationController(User user, UserCredentials userCredentials) {
        this.user = user;
        this.userCredentials = userCredentials;
    }

@PostMapping
public ResponseEntity<User> authCollecter(@Valid @RequestBody User user, @Valid @RequestBody UserCredentials userCredentials) {
        User userCreated = userService.create(userCreateDto);


    if (AuthentificationService.isAuthValid(user, userCredentials)) {
        return ResponseEntity.status(HttpStatus.CREATED).body("l'authentification a focntionné 🥳");
    }

    throw new IllegalArgumentException("L'authentification n'a pas marché 😕");
}