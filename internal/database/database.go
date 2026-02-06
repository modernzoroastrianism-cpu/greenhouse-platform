package database

import (
	"context"
	"database/sql"
	"fmt"
	"time"

	_ "github.com/marcboeker/go-duckdb"
)

type DB struct {
	conn *sql.DB
}

func New(databaseURL string) (*DB, error) {
	conn, err := sql.Open("duckdb", databaseURL)
	if err != nil {
		return nil, fmt.Errorf("failed to open database: %w", err)
	}

	// Test connection
	if err := conn.Ping(); err != nil {
		return nil, fmt.Errorf("failed to ping database: %w", err)
	}

	return &DB{conn: conn}, nil
}

func (db *DB) Close() error {
	return db.conn.Close()
}

func (db *DB) Migrate() error {
	migrations := []string{
		// Users table
		`CREATE TABLE IF NOT EXISTS users (
			id VARCHAR PRIMARY KEY,
			name VARCHAR,
			phone VARCHAR UNIQUE,
			email VARCHAR,
			location VARCHAR,
			timezone VARCHAR DEFAULT 'UTC',
			experience_level VARCHAR DEFAULT 'beginner',
			created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
			updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
		)`,

		// Greenhouses table
		`CREATE TABLE IF NOT EXISTS greenhouses (
			id VARCHAR PRIMARY KEY,
			user_id VARCHAR REFERENCES users(id),
			name VARCHAR,
			location VARCHAR,
			orientation VARCHAR,
			size_sqft FLOAT,
			setup_complete BOOLEAN DEFAULT FALSE,
			created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
		)`,

		// Sensor readings (time-series)
		`CREATE TABLE IF NOT EXISTS readings (
			greenhouse_id VARCHAR,
			sensor_type VARCHAR,
			sensor_id VARCHAR,
			value FLOAT,
			unit VARCHAR,
			ts TIMESTAMP DEFAULT CURRENT_TIMESTAMP
		)`,

		// Plants table
		`CREATE TABLE IF NOT EXISTS plants (
			id VARCHAR PRIMARY KEY,
			greenhouse_id VARCHAR REFERENCES greenhouses(id),
			name VARCHAR,
			variety VARCHAR,
			planted_at TIMESTAMP,
			expected_harvest_days INT,
			status VARCHAR DEFAULT 'growing',
			zone VARCHAR,
			notes TEXT,
			created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
		)`,

		// Plant events (watering, feeding, problems, harvests)
		`CREATE TABLE IF NOT EXISTS plant_events (
			id VARCHAR PRIMARY KEY,
			plant_id VARCHAR REFERENCES plants(id),
			event_type VARCHAR,
			description TEXT,
			data JSON,
			ts TIMESTAMP DEFAULT CURRENT_TIMESTAMP
		)`,

		// Conversations (call history)
		`CREATE TABLE IF NOT EXISTS conversations (
			id VARCHAR PRIMARY KEY,
			user_id VARCHAR REFERENCES users(id),
			greenhouse_id VARCHAR REFERENCES greenhouses(id),
			channel VARCHAR DEFAULT 'phone',
			started_at TIMESTAMP,
			ended_at TIMESTAMP,
			duration_seconds INT,
			transcript TEXT,
			summary TEXT
		)`,

		// Messages within conversations
		`CREATE TABLE IF NOT EXISTS messages (
			id VARCHAR PRIMARY KEY,
			conversation_id VARCHAR REFERENCES conversations(id),
			role VARCHAR,
			content TEXT,
			audio_url VARCHAR,
			ts TIMESTAMP DEFAULT CURRENT_TIMESTAMP
		)`,

		// Actions (commands executed)
		`CREATE TABLE IF NOT EXISTS actions (
			id VARCHAR PRIMARY KEY,
			greenhouse_id VARCHAR REFERENCES greenhouses(id),
			action_type VARCHAR,
			parameters JSON,
			status VARCHAR DEFAULT 'pending',
			result JSON,
			triggered_by VARCHAR,
			ts TIMESTAMP DEFAULT CURRENT_TIMESTAMP
		)`,

		// Alerts
		`CREATE TABLE IF NOT EXISTS alerts (
			id VARCHAR PRIMARY KEY,
			greenhouse_id VARCHAR REFERENCES greenhouses(id),
			alert_type VARCHAR,
			severity VARCHAR,
			message TEXT,
			acknowledged BOOLEAN DEFAULT FALSE,
			ts TIMESTAMP DEFAULT CURRENT_TIMESTAMP
		)`,
	}

	for _, m := range migrations {
		if _, err := db.conn.Exec(m); err != nil {
			return fmt.Errorf("migration failed: %w", err)
		}
	}

	return nil
}

// Sensor readings

type Reading struct {
	GreenhouseID string
	SensorType   string
	SensorID     string
	Value        float64
	Unit         string
	Timestamp    time.Time
}

func (db *DB) InsertReading(ctx context.Context, r Reading) error {
	_, err := db.conn.ExecContext(ctx,
		`INSERT INTO readings (greenhouse_id, sensor_type, sensor_id, value, unit, ts) 
		 VALUES (?, ?, ?, ?, ?, ?)`,
		r.GreenhouseID, r.SensorType, r.SensorID, r.Value, r.Unit, r.Timestamp,
	)
	return err
}

func (db *DB) GetLatestReadings(ctx context.Context, greenhouseID string) ([]Reading, error) {
	rows, err := db.conn.QueryContext(ctx, `
		SELECT DISTINCT ON (sensor_type) 
			greenhouse_id, sensor_type, sensor_id, value, unit, ts
		FROM readings
		WHERE greenhouse_id = ?
		ORDER BY sensor_type, ts DESC
	`, greenhouseID)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var readings []Reading
	for rows.Next() {
		var r Reading
		if err := rows.Scan(&r.GreenhouseID, &r.SensorType, &r.SensorID, &r.Value, &r.Unit, &r.Timestamp); err != nil {
			return nil, err
		}
		readings = append(readings, r)
	}
	return readings, nil
}

func (db *DB) GetReadingsRange(ctx context.Context, greenhouseID, sensorType string, from, to time.Time) ([]Reading, error) {
	rows, err := db.conn.QueryContext(ctx, `
		SELECT greenhouse_id, sensor_type, sensor_id, value, unit, ts
		FROM readings
		WHERE greenhouse_id = ?
		  AND sensor_type = ?
		  AND ts BETWEEN ? AND ?
		ORDER BY ts
	`, greenhouseID, sensorType, from, to)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var readings []Reading
	for rows.Next() {
		var r Reading
		if err := rows.Scan(&r.GreenhouseID, &r.SensorType, &r.SensorID, &r.Value, &r.Unit, &r.Timestamp); err != nil {
			return nil, err
		}
		readings = append(readings, r)
	}
	return readings, nil
}

// Users

type User struct {
	ID              string
	Name            string
	Phone           string
	Email           string
	Location        string
	Timezone        string
	ExperienceLevel string
}

func (db *DB) GetUserByPhone(ctx context.Context, phone string) (*User, error) {
	var u User
	err := db.conn.QueryRowContext(ctx,
		`SELECT id, name, phone, email, location, timezone, experience_level 
		 FROM users WHERE phone = ?`, phone,
	).Scan(&u.ID, &u.Name, &u.Phone, &u.Email, &u.Location, &u.Timezone, &u.ExperienceLevel)
	if err != nil {
		return nil, err
	}
	return &u, nil
}

func (db *DB) GetUserGreenhouses(ctx context.Context, userID string) ([]string, error) {
	rows, err := db.conn.QueryContext(ctx,
		`SELECT id FROM greenhouses WHERE user_id = ?`, userID,
	)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var ids []string
	for rows.Next() {
		var id string
		if err := rows.Scan(&id); err != nil {
			return nil, err
		}
		ids = append(ids, id)
	}
	return ids, nil
}

// Conversations

func (db *DB) CreateConversation(ctx context.Context, id, userID, greenhouseID, channel string) error {
	_, err := db.conn.ExecContext(ctx,
		`INSERT INTO conversations (id, user_id, greenhouse_id, channel, started_at)
		 VALUES (?, ?, ?, ?, CURRENT_TIMESTAMP)`,
		id, userID, greenhouseID, channel,
	)
	return err
}

func (db *DB) EndConversation(ctx context.Context, id string, transcript, summary string, durationSec int) error {
	_, err := db.conn.ExecContext(ctx,
		`UPDATE conversations 
		 SET ended_at = CURRENT_TIMESTAMP, 
		     transcript = ?,
		     summary = ?,
		     duration_seconds = ?
		 WHERE id = ?`,
		transcript, summary, durationSec, id,
	)
	return err
}

// Actions

type Action struct {
	ID           string
	GreenhouseID string
	ActionType   string
	Parameters   string // JSON
	Status       string
	Result       string // JSON
	TriggeredBy  string
}

func (db *DB) CreateAction(ctx context.Context, a Action) error {
	_, err := db.conn.ExecContext(ctx,
		`INSERT INTO actions (id, greenhouse_id, action_type, parameters, status, triggered_by)
		 VALUES (?, ?, ?, ?, ?, ?)`,
		a.ID, a.GreenhouseID, a.ActionType, a.Parameters, a.Status, a.TriggeredBy,
	)
	return err
}

func (db *DB) UpdateActionStatus(ctx context.Context, id, status, result string) error {
	_, err := db.conn.ExecContext(ctx,
		`UPDATE actions SET status = ?, result = ? WHERE id = ?`,
		status, result, id,
	)
	return err
}
