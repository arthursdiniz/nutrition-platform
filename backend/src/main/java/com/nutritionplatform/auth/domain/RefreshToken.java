package com.nutritionplatform.auth.domain;
import jakarta.persistence.*;
import java.time.Instant; import java.util.UUID;
@Entity @Table(name="refresh_token") public class RefreshToken {
 @Id private UUID id; @ManyToOne(fetch=FetchType.LAZY) @JoinColumn(name="user_id") private AppUser user;
 @Column(name="token_hash") private String tokenHash; @Column(name="expires_at") private Instant expiresAt; @Column(name="revoked_at") private Instant revokedAt; @Column(name="created_at") private Instant createdAt;
 protected RefreshToken(){} public RefreshToken(AppUser u,String h,Instant e){id=UUID.randomUUID();user=u;tokenHash=h;expiresAt=e;createdAt=Instant.now();}
 public AppUser user(){return user;} public String hash(){return tokenHash;} public boolean active(){return revokedAt==null&&expiresAt.isAfter(Instant.now());} public void revoke(){revokedAt=Instant.now();}
}
