package com.nutritionplatform.auth.repository;
import com.nutritionplatform.auth.domain.RefreshToken; import org.springframework.data.jpa.repository.JpaRepository; import java.util.*;
public interface RefreshTokenRepository extends JpaRepository<RefreshToken,UUID>{Optional<RefreshToken> findByTokenHash(String tokenHash);}
