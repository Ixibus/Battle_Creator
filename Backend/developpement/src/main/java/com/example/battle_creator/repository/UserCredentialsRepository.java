package com.example.battle_creator.repository;

import com.example.battle_creator.model.UserCredentials;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserCredentialsRepository extends JpaRepository<UserCredentials, Long> {
    Optional<UserCredentials> findByUserId(Long userId);
}