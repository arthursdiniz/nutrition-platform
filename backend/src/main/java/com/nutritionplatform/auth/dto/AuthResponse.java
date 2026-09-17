package com.nutritionplatform.auth.dto;

import com.nutritionplatform.auth.domain.AppUser;
import java.util.UUID;

public record AuthResponse(String accessToken, String refreshToken, String tokenType, UserView user) {
    public static AuthResponse of(String access, String refresh, AppUser user) { return new AuthResponse(access, refresh, "Bearer", new UserView(user.getId(), user.getEmail(), user.getRole().name())); }
    public record UserView(UUID id, String email, String role) { }
}
