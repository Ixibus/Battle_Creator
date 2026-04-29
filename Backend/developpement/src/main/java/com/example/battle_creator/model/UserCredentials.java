package com.example.battle_creator.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "users_credentials")
public class UserCredentials {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "password_hash", length = 255, nullable = false)
    private String passwordHash;

    @Column(name = "password_salt", length = 255, nullable = false)
    private String passwordSalt;

    @Column(name = "password_algo", length = 50, nullable = false)
    private String passwordAlgo = "argon2id";

    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt;

    public UserCredentials() {
    }

    public UserCredentials(String passwordHash, String passwordSalt, String passwordAlgo) {
        this.passwordHash = passwordHash;
        this.passwordSalt = passwordSalt;
        this.passwordAlgo = passwordAlgo;
    }

    @PrePersist
    protected void onCreate() {
        if (this.passwordAlgo == null) {
            this.passwordAlgo = "argon2id";
        }
        this.updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        this.updatedAt = LocalDateTime.now();
    }

    public Long getId() {
        return id;
    }

    public String getPasswordHash() {
        return passwordHash;
    }

    public String getPasswordSalt() {
        return passwordSalt;
    }

    public String getPasswordAlgo() {
        return passwordAlgo;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setPasswordHash(String passwordHash) {
        this.passwordHash = passwordHash;
    }

    public void setPasswordSalt(String passwordSalt) {
        this.passwordSalt = passwordSalt;
    }

    public void setPasswordAlgo(String passwordAlgo) {
        this.passwordAlgo = passwordAlgo;
    }

    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }
}