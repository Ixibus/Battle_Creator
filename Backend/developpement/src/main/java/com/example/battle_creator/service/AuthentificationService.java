package com.example.battle_creator.service;

import com.example.battle_creator.dto.UserCreateDto;
import com.example.battle_creator.dto.UserUpdateDto;
import com.example.battle_creator.mapper.UserMapper;
import com.example.battle_creator.model.User;
import com.example.battle_creator.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class AuthentificationService {

    private final UserRepository userRepository;
    private final UserCredentialsRepository userCredentialsRepository;
    private Boolean IsUserValid;
    private Boolean IsPasswordValid;


    public UserService(UserRepository userRepository, UserCredentialsRepository userCredentialsRepository) {

        this.userRepository = userRepository;
        this.userCredentialsRepository = userCredentialsRepository;

    }

    @Transactionnal
    private Boolean isAuthValid(user, userCredentials) {

        IsUserValid isUserValid = joinUserEntityChecker(userRepository.getId(),userCredentialsRepository.getUserId());

        IsPasswordValid isPasswordValid = userCredentialsRepository.findByPasswordHash(userCredentials.getPasswordHash());

        if ( IsUserValid && IsPasswordValid ) {
            return true
        }

        return false;
    }

    private Boolean joinUserEntityChecker(userId, userCredentialId){
        if (userId === userCredentialId) {
            return true;
        }
        return false;
    }
}
//    @Transactional
//    public User create(UserCreateDto dto) {
//        validateCreateDto(dto);
//        User user = UserMapper.toEntity(dto);
//        return userRepository.save(user);
//    }
//
//    @Transactional
//    public User update(Long id, UserUpdateDto dto) {
//        validateId(id);
//        validateUpdateDto(dto);
//
//        User existingUser = userRepository.findById(id)
//                .orElseThrow(() -> new IllegalArgumentException("Utilisateur introuvable avec l'id : " + id));
//
//        UserMapper.updateEntity(existingUser, dto);
//        return userRepository.save(existingUser);
//    }
//
//    public List<User> getAll() {
//        return userRepository.findAll();
//    }
//
//    public Optional<User> getById(Long id) {
//        validateId(id);
//        return userRepository.findById(id);
//    }
//
//    @Transactional
//    public void delete(Long id) {
//        validateId(id);
//
//        if (!userRepository.existsById(id)) {
//            throw new IllegalArgumentException("Utilisateur introuvable avec l'id : " + id);
//        }
//
//        userRepository.deleteById(id);
//    }
//
//    private void validateCreateDto(UserCreateDto dto) {
//        if (dto == null) {
//            throw new IllegalArgumentException("Les données de création ne peuvent pas être null.");
//        }
//        if (dto.getEmail() == null || dto.getEmail().trim().isEmpty()) {
//            throw new IllegalArgumentException("L'email est obligatoire.");
//        }
//        if (dto.getLogin() == null || dto.getLogin().trim().isEmpty()) {
//            throw new IllegalArgumentException("Le login est obligatoire.");
//        }
//    }
//
//    private void validateUpdateDto(UserUpdateDto dto) {
//        if (dto == null) {
//            throw new IllegalArgumentException("Les données de mise à jour ne peuvent pas être null.");
//        }
//        if (dto.getEmail() == null || dto.getEmail().trim().isEmpty()) {
//            throw new IllegalArgumentException("L'email est obligatoire.");
//        }
//        if (dto.getLogin() == null || dto.getLogin().trim().isEmpty()) {
//            throw new IllegalArgumentException("Le login est obligatoire.");
//        }
//    }
//
//    private void validateId(Long id) {
//        if (id == null || id <= 0) {
//            throw new IllegalArgumentException("L'id doit être positif.");
//        }
//    }
}