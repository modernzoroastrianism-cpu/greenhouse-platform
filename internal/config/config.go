package config

import (
	"os"

	"github.com/joho/godotenv"
)

type TwilioConfig struct {
	AccountSID string
	AuthToken  string
	PhoneFrom  string
}

type Config struct {
	Port        string
	DatabaseURL string
	OllamaURL   string
	OllamaModel string
	MQTTBroker  string
	Twilio      TwilioConfig
}

func Load() (*Config, error) {
	// Load .env if exists
	godotenv.Load()

	cfg := &Config{
		Port:        getEnv("PORT", "8080"),
		DatabaseURL: getEnv("DATABASE_URL", "md:greenhouse?motherduck_token="),
		OllamaURL:   getEnv("OLLAMA_URL", "http://localhost:11434"),
		OllamaModel: getEnv("OLLAMA_MODEL", "llama3.1:8b"),
		MQTTBroker:  getEnv("MQTT_BROKER", "tcp://localhost:1883"),
		Twilio: TwilioConfig{
			AccountSID: getEnv("TWILIO_ACCOUNT_SID", ""),
			AuthToken:  getEnv("TWILIO_AUTH_TOKEN", ""),
			PhoneFrom:  getEnv("TWILIO_PHONE_FROM", ""),
		},
	}

	return cfg, nil
}

func getEnv(key, fallback string) string {
	if val := os.Getenv(key); val != "" {
		return val
	}
	return fallback
}
