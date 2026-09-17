package com.nutritionplatform.nutritionprofile.repository;
import com.nutritionplatform.nutritionprofile.domain.NutritionProfile; import org.springframework.data.jpa.repository.JpaRepository; import java.util.*;
public interface NutritionProfileRepository extends JpaRepository<NutritionProfile,UUID>{Optional<NutritionProfile> findByUserId(UUID userId);}
