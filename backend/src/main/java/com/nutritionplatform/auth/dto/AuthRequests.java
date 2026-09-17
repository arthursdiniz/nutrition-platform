package com.nutritionplatform.auth.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public final class AuthRequests {
    private AuthRequests() { }
    public record Register(@Email @NotBlank String email, @NotBlank @Size(min = 8, max = 72) String password) { }
    public record Login(@Email @NotBlank String email, @NotBlank String password) { }
    public record Refresh(@NotBlank String refreshToken) { }
}
