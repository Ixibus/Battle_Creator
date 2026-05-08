package com.example.battle_creator.config;

//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.argon2.Argon2PasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

//@Configuration
public class PasswordEncoderConfig {
//    @Bean
    public static PasswordEncoder passwordEncoder() {
        return Argon2PasswordEncoder.defaultsForSpringSecurity_v5_8();
    }

    final static String mdp = "monMotDePasse";

    static String mdpHash = passwordEncoder().encode(mdp);

    static String test = "hello";


    public static void main(String[] args) {
        System.out.println(mdpHash);
//        System.out.println(test);
    }

}

