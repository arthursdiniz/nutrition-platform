CREATE TABLE nutrition_profile (
    id UUID PRIMARY KEY,
    user_id UUID NOT NULL UNIQUE REFERENCES app_user(id),
    display_name VARCHAR(120),
    birth_date DATE,
    height_cm NUMERIC(5,2),
    current_weight_kg NUMERIC(6,2),
    goal VARCHAR(40),
    activity_level VARCHAR(40),
    dietary_preferences TEXT,
    allergies TEXT,
    restrictions TEXT,
    completed_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
);
