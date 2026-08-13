package com.example.battle_creator.controller;

import com.example.battle_creator.model.Mission;
import com.example.battle_creator.dto.MissionDto;
import com.example.battle_creator.service.MissionService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/missions")
public class MissionController {

    private final MissionService missionService;

    public MissionController(MissionService missionService) {
        this.missionService = missionService;
    }

    @GetMapping
    public ResponseEntity<List<Mission>> getAllMissions() {
        return ResponseEntity.ok(missionService.getAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Mission> getMissionById(@PathVariable Long id) {
        return missionService.getById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/project/{projectId}")
    public ResponseEntity<List<Mission>> getMissionsByProjectId(@PathVariable Long projectId) {
        return ResponseEntity.ok(missionService.getByProjectId(projectId));
    } 

    @PostMapping
    public ResponseEntity<Mission> createMission(@Valid @RequestBody MissionDto missionDto) {
        System.out.println("méthode du controller : createMission");

        Mission createdMission = missionService.create(missionDto);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdMission);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Mission> updateMission(@PathVariable Long id, @Valid @RequestBody MissionDto missionDto) {
        Mission modifiedMission = missionService.update(id, missionDto );
        return ResponseEntity.ok(modifiedMission);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteMission(@PathVariable Long id) {
        missionService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
