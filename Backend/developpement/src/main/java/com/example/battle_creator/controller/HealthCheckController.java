package com.example.battle_creator.controller; // Adapte selon le package de ton projet

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HealthCheckController {

    // Accepte GET et HEAD pour parer à toute éventualité
    @RequestMapping(value = "/healthCheckForWaitOn", method = {RequestMethod.GET, RequestMethod.HEAD})
    public ResponseEntity<Void> healthCheck() {
        return ResponseEntity.ok().build();
    }
}