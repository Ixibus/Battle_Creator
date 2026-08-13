package com.example.battle_creator.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import com.example.battle_creator.exception.InvalidPasswordException;
import org.springframework.http.MediaType;

import java.util.Map;
import java.util.List;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<String> handleIllegalArgument(IllegalArgumentException ex) {
        return ResponseEntity.badRequest().body(ex.getMessage());
    }

    @ExceptionHandler(org.springframework.dao.DataIntegrityViolationException.class)
    public ResponseEntity<Map<String, String>> handleDataIntegrity(org.springframework.dao.DataIntegrityViolationException ex) {
        Map<String, String> body = Map.of("message", "Erreur 409 (intégrité donnée en BDD et/ou durant la navette dto->service->model) : Au niveau de la base de données, la ou les valeur(s) est/sont déjà  présente(s) (CREATE?), n'existe(nt) pas (READ?, UPDATE?, DELETE?) ou n'est/ne sont pas conforme(s) (CREATE?)");
        return ResponseEntity.status(HttpStatus.CONFLICT).contentType(MediaType.APPLICATION_JSON).body(body);
    }

    @ExceptionHandler(DuplicateMemberException.class)
    public ResponseEntity<Map<String, String>> handleDuplicateMember(
        DuplicateMemberException ex
    ) {
        return ResponseEntity
            .status(HttpStatus.CONFLICT)
            .body(Map.of("message", ex.getMessage()));
    }

    @ExceptionHandler(InvalidPasswordException.class)
    public ResponseEntity<Map<String, Object>> handleInvalidPassword(
        InvalidPasswordException ex
    ) {
    Map<String, Object> response = Map.of(
        "code", "INVALID_PASSWORD",
        "message", "Le mot de passe ne respecte pas les règles de sécurité.",
        "errors", ex.getErrors()
    );

    return ResponseEntity
        .status(HttpStatus.BAD_REQUEST)
        .contentType(MediaType.APPLICATION_JSON)
        .body(response);
}
}