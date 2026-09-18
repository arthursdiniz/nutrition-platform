CREATE TABLE daily_checkin (id UUID PRIMARY KEY, user_id UUID NOT NULL REFERENCES app_user(id), checkin_date DATE NOT NULL, hunger_level SMALLINT, energy_level SMALLINT, sleep_quality SMALLINT, mood SMALLINT, water_ml INTEGER, exercise_minutes INTEGER, meal_plan_adherence SMALLINT, notes TEXT, created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP, UNIQUE(user_id, checkin_date));
CREATE TABLE weight_record (id UUID PRIMARY KEY, user_id UUID NOT NULL REFERENCES app_user(id), weight_kg NUMERIC(6,2) NOT NULL, recorded_at DATE NOT NULL, created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP);
CREATE TABLE body_measurement (id UUID PRIMARY KEY, user_id UUID NOT NULL REFERENCES app_user(id), measurement_type VARCHAR(40) NOT NULL, value_cm NUMERIC(6,2) NOT NULL, recorded_at DATE NOT NULL, created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP);
CREATE INDEX idx_daily_checkin_user_date ON daily_checkin(user_id, checkin_date DESC);
CREATE INDEX idx_weight_record_user_date ON weight_record(user_id, recorded_at DESC);
CREATE INDEX idx_body_measurement_user_date ON body_measurement(user_id, recorded_at DESC);
