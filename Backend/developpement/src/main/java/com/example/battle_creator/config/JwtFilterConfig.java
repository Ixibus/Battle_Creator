package com.example.battle_creator.config;

import com.example.battle_creator.filter.JwtFilter;
import com.example.battle_creator.service.AuthentificationService;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class JwtFilterConfig {

    private final AuthentificationService authentificationService;
    private final JwtUtils jwtUtils;

    public JwtFilterConfig(AuthentificationService authentificationService, JwtUtils jwtUtils) {
        this.authentificationService = authentificationService;
        this.jwtUtils = jwtUtils;
    }

    @Bean
    public JwtFilter jwtFilter() {
        return new JwtFilter(authentificationService, jwtUtils);
    }
}
