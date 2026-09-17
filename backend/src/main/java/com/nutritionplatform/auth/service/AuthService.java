package com.nutritionplatform.auth.service;

import com.nutritionplatform.auth.domain.AppUser;
import com.nutritionplatform.auth.dto.AuthResponse;
import com.nutritionplatform.auth.repository.AppUserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import java.util.Locale;
import java.time.Instant; import java.security.*; import java.util.Base64;
import com.nutritionplatform.auth.domain.RefreshToken; import com.nutritionplatform.auth.repository.RefreshTokenRepository;

@Service
public class AuthService {
    private final AppUserRepository users; private final RefreshTokenRepository tokens; private final PasswordEncoder passwords; private final JwtService jwt;
    public AuthService(AppUserRepository users, RefreshTokenRepository tokens, PasswordEncoder passwords, JwtService jwt) { this.users = users; this.tokens=tokens; this.passwords = passwords; this.jwt = jwt; }
    public AuthResponse register(String email, String password) {
        String normalized = email.trim().toLowerCase(Locale.ROOT);
        if (users.findByEmail(normalized).isPresent()) throw new ResponseStatusException(HttpStatus.CONFLICT, "Não foi possível criar a conta.");
        AppUser user = users.save(new AppUser(normalized, passwords.encode(password)));
        return response(user);
    }
    public AuthResponse login(String email, String password) {
        AppUser user = users.findByEmail(email.trim().toLowerCase(Locale.ROOT)).orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Credenciais inválidas."));
        if (!passwords.matches(password, user.getPasswordHash())) throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Credenciais inválidas.");
        return response(user);
    }
    public AuthResponse refresh(String raw) { var token=tokens.findByTokenHash(hash(raw)).filter(RefreshToken::active).orElseThrow(()->new ResponseStatusException(HttpStatus.UNAUTHORIZED,"Sessão inválida.")); token.revoke(); tokens.save(token); return response(token.user()); }
    private AuthResponse response(AppUser user) { String raw=Base64.getUrlEncoder().withoutPadding().encodeToString(random(48)); tokens.save(new RefreshToken(user,hash(raw),Instant.now().plusSeconds(2_592_000))); return AuthResponse.of(jwt.issue(user),raw,user); }
    private byte[] random(int n){byte[] b=new byte[n];new SecureRandom().nextBytes(b);return b;} private String hash(String s){try{return java.util.HexFormat.of().formatHex(MessageDigest.getInstance("SHA-256").digest(s.getBytes()));}catch(NoSuchAlgorithmException e){throw new IllegalStateException(e);}}
}
