package com.nutritionplatform.auth.controller;

import com.nutritionplatform.auth.dto.AuthRequests;
import com.nutritionplatform.auth.dto.AuthResponse;
import com.nutritionplatform.auth.service.AuthService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/auth")
public class AuthController {
    private final AuthService auth;
    public AuthController(AuthService auth) { this.auth = auth; }
    @PostMapping("/register") @ResponseStatus(HttpStatus.CREATED)
    AuthResponse register(@Valid @RequestBody AuthRequests.Register request) { return auth.register(request.email(), request.password()); }
    @PostMapping("/login")
    AuthResponse login(@Valid @RequestBody AuthRequests.Login request) { return auth.login(request.email(), request.password()); }
    @PostMapping("/refresh")
    AuthResponse refresh(@Valid @RequestBody AuthRequests.Refresh request) { return auth.refresh(request.refreshToken()); }
}
