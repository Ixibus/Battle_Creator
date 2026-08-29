package com.example.battlecreator.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HealthCheckControllerForWaitOn {

    // Répond à la racine en GET et HEAD avec un statut 200 OK
    @RequestMapping(value = {"/", "/healthForWaitOn"}, method = {RequestMethod.GET, RequestMethod.HEAD})
    public ResponseEntity<Void> healthCheck() {
        return ResponseEntity.ok().build();
    }
}