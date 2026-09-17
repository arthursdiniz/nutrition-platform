package com.nutritionplatform.nutritionprofile.dto;
import jakarta.validation.constraints.*; import java.math.BigDecimal; import java.time.LocalDate;
public record NutritionProfileRequest(@Size(max=120) String displayName, LocalDate birthDate, @DecimalMin("50") @DecimalMax("260") BigDecimal heightCm, @DecimalMin("20") @DecimalMax("500") BigDecimal currentWeightKg, @Size(max=40) String goal, @Size(max=40) String activityLevel, String dietaryPreferences, String allergies, String restrictions) { }
