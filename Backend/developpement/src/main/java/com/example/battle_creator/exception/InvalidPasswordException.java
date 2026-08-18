package com.example.battle_creator.exception;

import java.util.List;

public class InvalidPasswordException extends RuntimeException {

    private final List<String> errors;

    public InvalidPasswordException(List<String> errors) {
        super("Le mot de passe n'est pas valide.");
        this.errors = errors;
    }

    public List<String> getErrors() {
        return errors;
    }
}