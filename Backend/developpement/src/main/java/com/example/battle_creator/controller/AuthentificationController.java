package com.example.battle_creator.controller;

import ch.qos.logback.classic.Logger;
import com.example.battle_creator.config.JwtUtils;
import com.example.battle_creator.dto.AuthRequestDto;
import com.example.battle_creator.dto.UserCreateDto;
import com.example.battle_creator.model.User;
import com.example.battle_creator.model.UserCredentials;
import com.example.battle_creator.repository.UserRepository;
import com.example.battle_creator.service.AuthentificationService;
import org.apache.tomcat.util.net.openssl.ciphers.Authentication;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "http://localhost:5173", maxAge = 3600)
public class AuthentificationController {

// // Config authentification simple (sans encoder, sans token)
//    private final AuthentificationService authentificationService;
//public AuthentificationController(AuthentificationService authentificationService) {
//    this.authentificationService = authentificationService;
//}

    private final AuthentificationService authentificationService;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtils jwtUtils;
    private final AuthenticationManager authenticationManager;

    public AuthentificationController(AuthentificationService authentificationService, UserRepository userRepository, PasswordEncoder passwordEncoder, JwtUtils jwtUtils, AuthenticationManager authenticationManager) {
        this.authentificationService = authentificationService;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtils = jwtUtils;
        this.authenticationManager = authenticationManager;
    }

    public static void main(String[] args) {
            System.out.println("Bonjour depuis une autre méthode");
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody UserCreateDto requestUserCreateDto) {
        if (userRepository.findByLogin(requestUserCreateDto.getLogin()).isPresent()) {
            return ResponseEntity.badRequest().body("Le login est déjà utilisé");
        }
        User userCreated = authentificationService.create(requestUserCreateDto);
        return ResponseEntity.status(HttpStatus.CREATED).body(userCreated);

    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User user) {
        try {
            Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(user.getLogin(), usercredentials.getPassword()));
            if (authentication.isAuthenticated()) {
                Map<String, Object> authData = new HashMap<>();
                authData.put("token", jwtUtils.generateToken(user.getLogin()));
                authData.put("type", "Bearer");
                return ResponseEntity.ok(authData);
            }
            return  ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("le login ou mot de passe est incorrect");
        } catch (AuthenticationException e) {
            Logger log;
            log.error(e.getMessage());
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("le login ou mot de passe est incorrect");
        }
    }








// // Config authentification simple (sans encoder, sans token)
//    @PostMapping("/login")
//    public ResponseEntity<String> login(@RequestBody AuthRequestDto request) {
//
//
//
//        boolean isValid = authentificationService.isAuthValid(request.getLogin(), request.getPassword());
//
//        if (isValid) {
//            return ResponseEntity.ok("L'authentification a fonctionné 🥳");
//        }
//
//
//        return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
//                .body("Login ou mot de passe incorrect 😕");
//    }
}
