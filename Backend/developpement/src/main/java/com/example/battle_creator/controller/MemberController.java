package com.example.battle_creator.controller;

import com.example.battle_creator.dto.MemberCreateDto;
import com.example.battle_creator.dto.MemberUpdateDto;
import com.example.battle_creator.model.Member;
import com.example.battle_creator.service.MemberService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/members")
public class MemberController {

    private final MemberService memberService;

    public MemberController(MemberService memberService) {
        this.memberService = memberService;
    }

    @GetMapping
    public ResponseEntity<List<Member>> getAllMembers() {
        return ResponseEntity.ok(memberService.getAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Member> getByMember(@PathVariable Long id) {
        return memberService.getById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Member> createMember(@Valid @RequestBody MemberCreateDto memberCreateDto) {
        Member memberCreated = memberService.create(memberCreateDto);
        return ResponseEntity.status(HttpStatus.CREATED).body(memberCreated);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Member> updateMember(@PathVariable Long id, @Valid @RequestBody MemberUpdateDto memberUpdateDto) {
        Member memberUpdated = memberService.update(id, memberUpdateDto);
        return ResponseEntity.ok(memberUpdated);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteMember(@PathVariable Long id) {
        memberService.delete(id);
        return ResponseEntity.noContent().build();
    }
}