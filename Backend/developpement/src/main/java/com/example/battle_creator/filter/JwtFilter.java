package com.example.battle_creator.filter;

import com.example.battle_creator.config.JwtUtils;
import com.example.battle_creator.service.AuthentificationService;
import io.jsonwebtoken.JwtException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

public class JwtFilter extends OncePerRequestFilter {

    private final AuthentificationService authentificationService;
    private final JwtUtils jwtUtils;

    public JwtFilter(AuthentificationService authentificationService, JwtUtils jwtUtils) {
        this.authentificationService = authentificationService;
        this.jwtUtils = jwtUtils;
    }

    // Le filtre de cookie n'est pas exécuté sur ces routes
    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) {
        String path = request.getServletPath();
        return path.equals("/auth/login") || path.equals("/auth/register");
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        String jwt = null;
        String username = null;

        Cookie[] cookies = request.getCookies();
        if (cookies != null) {
            for (Cookie cookie : cookies) {
                if ("token".equals(cookie.getName())) {
                    jwt = cookie.getValue();
                    break;
                }
            }
        }

        if (jwt != null) {
            try {
                username = jwtUtils.extractUsername(jwt);

                if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
                    UserDetails userDetails = authentificationService.loadUserByUsername(username);

                    if (jwtUtils.validateToken(jwt, userDetails)) {
                        UsernamePasswordAuthenticationToken authenticationToken = 
                                new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
                        authenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                        SecurityContextHolder.getContext().setAuthentication(authenticationToken);
                    }
                }
            } catch (JwtException | IllegalArgumentException e) {
                // Si le token est invalide, expiré ou si la signature ne correspond pas :
                // On log l'avertissement et on laisse la requête poursuivre.
                // Spring Security détectera l'absence d'authentification et renverra un statut 401 Unauthorized.
                logger.warn("Token JWT invalide ou expiré intercepté dans le filtre : " + e.getMessage());
            }
        }

        filterChain.doFilter(request, response);
    }
}