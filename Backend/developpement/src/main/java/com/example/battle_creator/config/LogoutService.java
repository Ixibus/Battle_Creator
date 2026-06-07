package com.example.battle_creator.config;

import org.springframework.stereotype.Service;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.logout.LogoutHandler;
import org.springframework.http.ResponseEntity;


@Service
public class LogoutService implements LogoutHandler{


//    public LogoutService() {
//        this.
//    }

    @Override
    public ResponseEntity<?> logout(HttpServletRequest request, HttpServletResponse response, Authentication authentication) {
        final String authHeader = request.getHeader("Authorization");
        final String jwt;
        if (authHeader == null || !authHeader.startsWith("token ")) {
            return;
        }

        Cookie[] cookies = authHeader.getCookies();
        if (cookies != null) {
            for (Cookie cookie : authHeader.getCookies()) {
                if ("token".equals(cookie.getName())) {
                    cookie.getName().clear();
                    cookie.getValue().clear();
                    break;
                }
            }
        }

        return ResponseEntity.ok("cookie effacé");
    }
}