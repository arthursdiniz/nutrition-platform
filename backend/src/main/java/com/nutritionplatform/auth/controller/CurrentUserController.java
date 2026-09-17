package com.nutritionplatform.auth.controller;

import com.nutritionplatform.auth.dto.AuthResponse;
import com.nutritionplatform.auth.repository.AppUserRepository;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/auth")
public class CurrentUserController {
    private final AppUserRepository users;
    public CurrentUserController(AppUserRepository users) { this.users = users; }
    @GetMapping("/me")
    AuthResponse.UserView me(Authentication auth) {
        var user = users.findById((UUID) auth.getPrincipal()).orElseThrow();
        return new AuthResponse.UserView(user.getId(), user.getEmail(), user.getRole().name());
    }
}
