package com.example.battle_creator.service;

import com.example.battle_creator.model.User;
import com.example.battle_creator.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Transactional
    public User create(User user) {
        validateUser(user);

        User userCreated = new User();
        userCreated.setEmail(cleanText(user.getEmail()));
        userCreated.setLogin(cleanText(user.getLogin()));
        userCreated.setIsActive(user.getIsActive());

        return userRepository.save(userCreated);
    }

    @Transactional
    public User update(Long id, User user) {
        validateId(id);
        validateUser(user);

        User existingUser = userRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Utilisateur introuvable avec l'id : " + id));

        existingUser.setEmail(cleanText(user.getEmail()));
        existingUser.setLogin(cleanText(user.getLogin()));
        existingUser.setIsActive(user.getIsActive());

        return userRepository.save(existingUser);
    }

    public List<User> getAll() {
        return userRepository.findAll();
    }

    public Optional<User> getById(Long id) {
        validateId(id);
        return userRepository.findById(id);
    }

    @Transactional
    public void delete(Long id) {
        validateId(id);

        if (!userRepository.existsById(id)) {
            throw new IllegalArgumentException("Utilisateur introuvable avec l'id : " + id);
        }

        userRepository.deleteById(id);
    }

    private void validateUser(User user) {
        if (user == null) {
            throw new IllegalArgumentException("L'utilisateur ne peut pas être nul.");
        }
        if (user.getEmail() == null || user.getEmail().trim().isEmpty()) {
            throw new IllegalArgumentException("L'email est obligatoire.");
        }
        if (user.getLogin() == null || user.getLogin().trim().isEmpty()) {
            throw new IllegalArgumentException("Le login est obligatoire.");
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