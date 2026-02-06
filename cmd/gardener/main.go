package main

import (
	"context"
	"log"
	"os"
	"os/signal"
	"syscall"

	"github.com/growtogether/greenhouse-platform/internal/ai"
	"github.com/growtogether/greenhouse-platform/internal/config"
	"github.com/growtogether/greenhouse-platform/internal/database"
	"github.com/growtogether/greenhouse-platform/internal/sensors"
	"github.com/growtogether/greenhouse-platform/internal/voice"
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
)

func main() {
	// Load config
	cfg, err := config.Load()
	if err != nil {
		log.Fatalf("Failed to load config: %v", err)
	}

	// Initialize database (MotherDuck/DuckDB)
	db, err := database.New(cfg.DatabaseURL)
	if err != nil {
		log.Fatalf("Failed to connect to database: %v", err)
	}
	defer db.Close()

	// Run migrations
	if err := db.Migrate(); err != nil {
		log.Fatalf("Failed to run migrations: %v", err)
	}

	// Initialize AI engine (Ollama)
	aiEngine, err := ai.NewEngine(cfg.OllamaURL, cfg.OllamaModel)
	if err != nil {
		log.Fatalf("Failed to initialize AI engine: %v", err)
	}

	// Initialize sensor listener (MQTT)
	sensorHub, err := sensors.NewHub(cfg.MQTTBroker, db)
	if err != nil {
		log.Fatalf("Failed to initialize sensor hub: %v", err)
	}
	go sensorHub.Start()

	// Initialize voice handler (Twilio)
	voiceHandler := voice.NewHandler(cfg.Twilio, aiEngine, db)

	// Setup HTTP server
	e := echo.New()
	e.Use(middleware.Logger())
	e.Use(middleware.Recover())
	e.Use(middleware.CORS())

	// Voice routes (Twilio webhooks)
	e.POST("/voice/incoming", voiceHandler.HandleIncoming)
	e.POST("/voice/stream", voiceHandler.HandleStream)
	e.POST("/voice/transcription", voiceHandler.HandleTranscription)

	// API routes
	api := e.Group("/api/v1")
	
	// Greenhouse endpoints
	api.GET("/greenhouses/:id", func(c echo.Context) error {
		// Get greenhouse data
		return c.JSON(200, map[string]any{"status": "ok"})
	})
	api.GET("/greenhouses/:id/readings", func(c echo.Context) error {
		// Get sensor readings
		return c.JSON(200, map[string]any{"status": "ok"})
	})
	api.POST("/greenhouses/:id/actions", func(c echo.Context) error {
		// Execute action (water, vent, etc.)
		return c.JSON(200, map[string]any{"status": "ok"})
	})

	// Plant endpoints
	api.GET("/greenhouses/:id/plants", func(c echo.Context) error {
		return c.JSON(200, map[string]any{"status": "ok"})
	})
	api.POST("/greenhouses/:id/plants", func(c echo.Context) error {
		return c.JSON(200, map[string]any{"status": "ok"})
	})

	// User endpoints
	api.GET("/users/:id", func(c echo.Context) error {
		return c.JSON(200, map[string]any{"status": "ok"})
	})

	// Health check
	e.GET("/health", func(c echo.Context) error {
		return c.JSON(200, map[string]any{
			"status":  "healthy",
			"version": "0.1.0",
		})
	})

	// Serve static files (web UI)
	e.Static("/", "web/dist")

	// Graceful shutdown
	ctx, stop := signal.NotifyContext(context.Background(), os.Interrupt, syscall.SIGTERM)
	defer stop()

	go func() {
		if err := e.Start(":" + cfg.Port); err != nil {
			log.Printf("Server stopped: %v", err)
		}
	}()

	log.Printf("🌱 Greenhouse Platform running on port %s", cfg.Port)

	<-ctx.Done()
	log.Println("Shutting down...")
	
	sensorHub.Stop()
	e.Shutdown(context.Background())
}
