package com.example.battle_creator.service;

import com.example.battle_creator.model.User;
import com.example.battle_creator.model.UserCredentials;
import com.example.battle_creator.repository.UserCredentialsRepository;
import com.example.battle_creator.repository.UserRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collections;
import java.util.Optional;

@Service
public class AuthentificationService implements UserDetailsService {

    private final UserRepository userRepository;
    private final UserCredentialsRepository userCredentialsRepository;

    public AuthentificationService(UserRepository userRepository,
                                   UserCredentialsRepository userCredentialsRepository) {
        this.userRepository = userRepository;
        this.userCredentialsRepository = userCredentialsRepository;
    }

    @Override
    @Transactional(readOnly = true)
    public UserDetails loadUserByUsername(String login) throws UsernameNotFoundException {
        Optional<User> optionalLoginFound = userRepository.findByLogin(login);

        if (optionalLoginFound.isEmpty()) {
            throw new UsernameNotFoundException("Utilisateur introuvable : " + login);
        }

        User loginFound = optionalLoginFound.get();

        Optional<UserCredentials> optionalCredentials =
                userCredentialsRepository.findByUserId(loginFound.getId());

        if (optionalCredentials.isEmpty()) {
            throw new UsernameNotFoundException("Identifiants introuvables pour : " + login);
        }

        UserCredentials credentials = optionalCredentials.get();

        return org.springframework.security.core.userdetails.User
                .withUsername(loginFound.getLogin())
                .password(credentials.getPasswordHash())
                .authorities(Collections.emptyList())
                .build();
    }

    public String getCurrentLogin() {
        return org.springframework.security.core.context.SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getName();
    }

// // Config authentification simple (sans encoder, sans token)
//    @Transactional(readOnly = true)
//    public boolean isAuthValid(String login, String rawPassword) {
//        Optional<User> optionalUser = userRepository.findByLogin(login);
//
//        if (optionalUser.isEmpty()) {
//            return false;
//        }
//
//        User user = optionalUser.get();
//
//        Optional<UserCredentials> optionalCredentials =
//                userCredentialsRepository.findByUserId(user.getId());
//
//        if (optionalCredentials.isEmpty()) {
//            return false;
//        }
//
//        UserCredentials credentials = optionalCredentials.get();
//
//        return rawPassword.equals(credentials.getPasswordHash());
//    }

}