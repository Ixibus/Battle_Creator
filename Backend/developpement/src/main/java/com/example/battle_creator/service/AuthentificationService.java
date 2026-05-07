package com.example.battle_creator.service;

import com.example.battle_creator.dto.UserCreateDto;
import com.example.battle_creator.mapper.UserMapper;
import com.example.battle_creator.model.User;
import com.example.battle_creator.model.UserCredentials;
import com.example.battle_creator.repository.UserCredentialsRepository;
import com.example.battle_creator.repository.UserRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collections;
import java.util.Optional;

@Service
public class AuthentificationService implements UserDetailsService {

    private final UserRepository userRepository;
    private final UserCredentialsRepository userCredentialsRepository;
    private final PasswordEncoder passwordEncoder;

    public AuthentificationService(UserRepository userRepository,
                                   UserCredentialsRepository userCredentialsRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.userCredentialsRepository = userCredentialsRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Transactional
    public User create(UserCreateDto dto) {
        validateCreateDto(dto);
        User user = UserMapper.toEntity(dto);
        User userCreated = userRepository.save(user);

        UserCredentials userWithPasswordCreated = new UserCredentials();
        userWithPasswordCreated.setUser(userCreated.getId());
        userWithPasswordCreated.setPasswordHash(passwordEncoder.encode(dto.getRawPassword()));
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

    private void validateCreateDto(UserCreateDto dto) {
        if (dto == null) {
            throw new IllegalArgumentException("Les données de création ne peuvent pas être null.");
        }
        if (dto.getEmail() == null || dto.getEmail().trim().isEmpty()) {
            throw new IllegalArgumentException("L'email est obligatoire.");
        }
        if (dto.getLogin() == null || dto.getLogin().trim().isEmpty()) {
            throw new IllegalArgumentException("Le login est obligatoire.");
        }
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