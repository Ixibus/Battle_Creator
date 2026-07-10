package com.example.battle_creator.config;

import com.example.battle_creator.filter.JwtFilter;
import com.example.battle_creator.service.AuthentificationService;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.logout.CookieClearingLogoutHandler;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.security.config.Customizer;
import org.springframework.http.HttpMethod;

import java.util.HashMap;
import java.util.Map;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    private final AuthentificationService authentificationService;

    public SecurityConfig( AuthentificationService authentificationService) {
        this.authentificationService = authentificationService;
    }


    @Bean
    public AuthenticationManager authenticationManager(HttpSecurity http, PasswordEncoder passwordEncoder) {
        AuthenticationManagerBuilder authenticationManagerBuilder = http.getSharedObject(AuthenticationManagerBuilder.class);
        authenticationManagerBuilder.userDetailsService(authentificationService).passwordEncoder(passwordEncoder);
        return authenticationManagerBuilder.build();
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http, JwtFilter jwtFilter) throws Exception {
        return http.cors(Customizer.withDefaults()).csrf(AbstractHttpConfigurer::disable).authorizeHttpRequests(auth -> auth.requestMatchers("/error").permitAll().requestMatchers().permitAll()
    .anyRequest().authenticated()).addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class).logout(logout -> logout.logoutUrl("/auth/logout").logoutSuccessHandler((request, response, authentication) -> response.setStatus(200)).deleteCookies("token")).build();
    }
    // // Version avec l'autorisation explicite de la méthode OPTION pour le preflight
    // @Bean
    // public SecurityFilterChain securityFilterChain(HttpSecurity http, JwtFilter jwtFilter) throws Exception {
    //     return http.cors(Customizer.withDefaults()).csrf(AbstractHttpConfigurer::disable).authorizeHttpRequests(auth -> auth
    // .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()
    // .requestMatchers("/error").permitAll()
    // .requestMatchers("/auth/**", "/missions/**", "/users", "/test").permitAll()
    // .anyRequest().authenticated()).addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class).logout(logout -> logout.logoutUrl("/auth/logout").logoutSuccessHandler((request, response, authentication) -> response.setStatus(200)).deleteCookies("token")).build();
    // }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        CorsConfiguration config = new CorsConfiguration();
        config.setAllowCredentials(true);
        config.addAllowedOrigin("http://localhost:5173");
        config.addAllowedHeader("*");
        config.addAllowedMethod("GET");
        config.addAllowedMethod("POST");
        config.addAllowedMethod("DELETE");
        // config.addAllowedMethod("OPTIONS");

        Map<String,CorsConfiguration> allCorsConfig = new HashMap<>();
        allCorsConfig.put("/auth/**", config);        
        allCorsConfig.put("/missions/**", config);        
        allCorsConfig.put("/tasks/**", config);
        allCorsConfig.put("/members", config);

        source.setCorsConfigurations(allCorsConfig);
    return source;
}

}
