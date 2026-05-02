package com.example.battle_creator.controller;

import com.example.battle_creator.dto.AuthRequestDto;
import com.example.battle_creator.service.AuthentificationService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "http://localhost:5173", maxAge = 3600)
public class AuthentificationController {

    private final AuthentificationService authentificationService;

    public static void main(String[] args) {
            System.out.println("Bonjour depuis une autre méthode");
    }

    public AuthentificationController(AuthentificationService authentificationService) {
        this.authentificationService = authentificationService;
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody AuthRequestDto request) {
        boolean isValid = authentificationService.isAuthValid(request.getLogin(), request.getPassword());

        if (isValid) {
            return ResponseEntity.ok("L'authentification a fonctionné 🥳");
        }


        return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                .body("Login ou mot de passe incorrect 😕");
    }
}
