package com.example.battle_creator.service;

import com.example.battle_creator.dto.MemberCreateDto;
import com.example.battle_creator.dto.MemberUpdateDto;
import com.example.battle_creator.model.Member;
import com.example.battle_creator.repository.MemberRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class MemberService {

    private final MemberRepository memberRepository;

    public MemberService(MemberRepository memberRepository) {
        this.memberRepository = memberRepository;
    }

    @Transactional
    public Member create(MemberCreateDto memberDto) {
        validateMemberDto(memberDto);

        Member member = new Member();
        member.setFirstName(cleanText(memberDto.getFirstName()));
        member.setLastName(cleanText(memberDto.getLastName()));

        return memberRepository.save(member);
    }

    @Transactional
    public Member update(Long id, MemberUpdateDto memberDto) {
        validateId(id);
        validateMemberDto(memberDto);

        Member existingMember = memberRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("membre introuvable avec l'id : " + id));

        existingMember.setFirstName(cleanText(memberDto.getFirstName()));
        existingMember.setLastName(cleanText(memberDto.getLastName()));

        return memberRepository.save(existingMember);
    }

    public List<Member> getAll() {
        return memberRepository.findAll();
    }

    public Optional<Member> getById(Long id) {
        validateId(id);
        return memberRepository.findById(id);
    }

    @Transactional
    public void delete(Long id) {
        validateId(id);

        if (!memberRepository.existsById(id)) {
            throw new IllegalArgumentException("Membre introuvable avec l'id : " + id);
        }

        memberRepository.deleteById(id);
    }

    private void validateMemberDto(MemberDto memberDto) {
        if (memberDto == null) {
            throw new IllegalArgumentException("Le membre ne peut pas être nul.");
        }
        if (memberDto.getFirstName() == null || memberDto.getFirstName().trim().isEmpty()) {
            throw new IllegalArgumentException("Le prénom du membre est obligatoire.");
        }
        if (memberDto.getLastName() == null || memberDto.getLastName().trim().isEmpty()) {
            throw new IllegalArgumentException("Le nom du membre est obligatoire.");
        }
    }

    private void validateId(Long id) {
        if (id == null || id <= 0) {
            throw new IllegalArgumentException("L'id doit être positif.");
        }
    }

    private String cleanText(String text) {
        return text.trim().replaceAll("\\s+", " ");
    }
}