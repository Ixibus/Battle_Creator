package com.example.battlecreator.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HealthCheckControllerForWaitOn {

    // Répond à la racine en GET avec un statut 200 OK
    @GetMapping("/healthCheckForWaitOn")
    public ResponseEntity<Void> healthCheckForWaitOn() {
        return ResponseEntity.ok().build();
    }
}