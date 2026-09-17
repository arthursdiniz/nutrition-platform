package com.nutritionplatform.auth.domain;

import jakarta.persistence.*;
import java.time.Instant;
import java.util.UUID;

@Entity
@Table(name = "app_user")
public class AppUser {
    @Id private UUID id;
    @Column(nullable = false, unique = true, length = 320) private String email;
    @Column(name = "password_hash", nullable = false) private String passwordHash;
    @Enumerated(EnumType.STRING) @Column(nullable = false) private UserRole role;
    @Column(name = "created_at", nullable = false) private Instant createdAt;
    @Column(name = "updated_at", nullable = false) private Instant updatedAt;
    protected AppUser() { }
    public AppUser(String email, String passwordHash) { id = UUID.randomUUID(); this.email = email; this.passwordHash = passwordHash; role = UserRole.USER; createdAt = Instant.now(); updatedAt = createdAt; }
    public UUID getId() { return id; } public String getEmail() { return email; } public String getPasswordHash() { return passwordHash; } public UserRole getRole() { return role; }
}
