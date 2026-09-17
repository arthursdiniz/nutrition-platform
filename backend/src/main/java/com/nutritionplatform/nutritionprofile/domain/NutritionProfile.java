package com.nutritionplatform.nutritionprofile.domain;
import jakarta.persistence.*; import java.time.*; import java.util.UUID;
@Entity @Table(name="nutrition_profile") public class NutritionProfile {
 @Id private UUID id; @Column(name="user_id",unique=true,nullable=false) private UUID userId; private String displayName; private LocalDate birthDate; private java.math.BigDecimal heightCm; private java.math.BigDecimal currentWeightKg; private String goal; private String activityLevel; private String dietaryPreferences; private String allergies; private String restrictions; private Instant completedAt; private Instant createdAt; private Instant updatedAt;
 protected NutritionProfile(){} public NutritionProfile(UUID userId){id=UUID.randomUUID();this.userId=userId;createdAt=Instant.now();updatedAt=createdAt;}
 public UUID getUserId(){return userId;} public boolean complete(){return completedAt!=null;} public void update(String name,LocalDate birth,java.math.BigDecimal height,java.math.BigDecimal weight,String goal,String activity,String prefs,String allergies,String restrictions){displayName=name;birthDate=birth;heightCm=height;currentWeightKg=weight;this.goal=goal;activityLevel=activity;dietaryPreferences=prefs;this.allergies=allergies;this.restrictions=restrictions;completedAt=Instant.now();updatedAt=completedAt;}
 public String getDisplayName(){return displayName;}
}
