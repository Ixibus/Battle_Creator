package com.example.battle_creator.config;

//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.argon2.Argon2PasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import org.bouncycastle.crypto.generators.Argon2BytesGenerator;
import org.bouncycastle.crypto.params.Argon2Parameters;

import java.nio.charset.StandardCharsets;
import java.security.SecureRandom;
import java.util.Base64;

//@Configuration
public class PasswordEncoderConfig {

    final static String mdp = "monMotDePasse";


    public static void main(String[] args) {

    // salt fix pour tester
    byte[] salt = generateFixedSalt16Byte();
    // salt sécurisé à utiliser en production
    //byte[] salt = generateSalt16Byte();
        System.out.println("--> salt (Base64): " + Base64.getEncoder().encodeToString(salt));

    String encryptionKeyArgon2id = Base64.getEncoder().encodeToString(generateArgon2idInteractive(mdp, salt));
        System.out.println("--> encryptionKeyArgon2id (Base64) interactive: " + encryptionKeyArgon2id.replaceAll("=$", ""));
    }

    public static byte[] generateArgon2idInteractive(String password, byte[] salt) {
        int opsLimit = 2;
        int memLimit = 66536;
        int outputLength = 32;
        int parallelism = 1;
        Argon2Parameters.Builder builder = new Argon2Parameters.Builder(Argon2Parameters.ARGON2_id)
                .withVersion(Argon2Parameters.ARGON2_VERSION_13) // 19
                .withIterations(opsLimit)
                .withMemoryAsKB(memLimit)
                .withParallelism(parallelism)
                .withSalt(salt);
        Argon2BytesGenerator gen = new Argon2BytesGenerator();
        gen.init(builder.build());
        byte[] result = new byte[outputLength];
        gen.generateBytes(password.getBytes(StandardCharsets.UTF_8), result, 0, result.length);
        return result;
    }

    private static byte[] generateSalt16Byte() {
        SecureRandom secureRandom = new SecureRandom();
        byte[] salt = new byte[16];
        secureRandom.nextBytes(salt);
        return salt;
    }

    private static byte[] generateFixedSalt16Byte() {
        byte[] salt = new byte[16];
        return salt;
    }

//    // hashage rapide avec Argon2PasswordEncoder de Spring security
//    //    @Bean
//    public static PasswordEncoder passwordEncoder() {
//        return Argon2PasswordEncoder.defaultsForSpringSecurity_v5_8();
//    }
//
//    final static String mdp = "monMotDePasse";
//
//    static String mdpHash = passwordEncoder().encode(mdp);
//
//    static String test = "hello";
//
//
//    public static void main(String[] args) {
//        System.out.println(mdpHash);
//    }

}

