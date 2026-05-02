package com.example.battle_creator.service;

import com.example.battle_creator.model.User;
import com.example.battle_creator.model.UserCredentials;
import com.example.battle_creator.repository.UserCredentialsRepository;
import com.example.battle_creator.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
public class AuthentificationService {

    private final UserRepository userRepository;
    private final UserCredentialsRepository userCredentialsRepository;

    public AuthentificationService(UserRepository userRepository,
                                   UserCredentialsRepository userCredentialsRepository) {
        this.userRepository = userRepository;
        this.userCredentialsRepository = userCredentialsRepository;
    }

    @Transactional(readOnly = true)
    public boolean isAuthValid(String login, String rawPassword) {
        Optional<User> optionalUser = userRepository.findByLogin(login);

        if (optionalUser.isEmpty()) {
            return false;
        }

        User user = optionalUser.get();

        Optional<UserCredentials> optionalCredentials =
                userCredentialsRepository.findByUserId(user.getId());

        if (optionalCredentials.isEmpty()) {
            return false;
        }

        UserCredentials credentials = optionalCredentials.get();

        return rawPassword.equals(credentials.getPasswordHash());
    }
}