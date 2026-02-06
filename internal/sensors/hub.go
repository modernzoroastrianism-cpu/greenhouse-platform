package sensors

import (
	"context"
	"encoding/json"
	"fmt"
	"log"
	"time"

	mqtt "github.com/eclipse/paho.mqtt.golang"
	"github.com/growtogether/greenhouse-platform/internal/database"
)

type Hub struct {
	client mqtt.Client
	db     *database.DB
	ctx    context.Context
	cancel context.CancelFunc
}

// SensorMessage is the format sensors publish to MQTT
type SensorMessage struct {
	GreenhouseID string  `json:"greenhouse_id"`
	SensorID     string  `json:"sensor_id"`
	SensorType   string  `json:"type"`
	Value        float64 `json:"value"`
	Unit         string  `json:"unit"`
	Timestamp    int64   `json:"ts,omitempty"`
}

func NewHub(brokerURL string, db *database.DB) (*Hub, error) {
	opts := mqtt.NewClientOptions().
		AddBroker(brokerURL).
		SetClientID("greenhouse-platform").
		SetAutoReconnect(true).
		SetConnectRetry(true).
		SetConnectRetryInterval(5 * time.Second)

	client := mqtt.NewClient(opts)
	
	ctx, cancel := context.WithCancel(context.Background())
	
	return &Hub{
		client: client,
		db:     db,
		ctx:    ctx,
		cancel: cancel,
	}, nil
}

func (h *Hub) Start() {
	// Connect to MQTT broker
	if token := h.client.Connect(); token.Wait() && token.Error() != nil {
		log.Printf("⚠️ MQTT connection failed: %v (will retry)", token.Error())
	} else {
		log.Println("📡 Connected to MQTT broker")
	}

	// Subscribe to sensor topics
	// Topic format: greenhouse/{greenhouse_id}/sensors/{sensor_type}
	topic := "greenhouse/+/sensors/#"
	
	h.client.Subscribe(topic, 1, func(client mqtt.Client, msg mqtt.Message) {
		h.handleMessage(msg)
	})

	log.Printf("📡 Subscribed to %s", topic)

	// Keep alive until stopped
	<-h.ctx.Done()
}

func (h *Hub) Stop() {
	h.cancel()
	h.client.Disconnect(250)
	log.Println("📡 Sensor hub stopped")
}

func (h *Hub) handleMessage(msg mqtt.Message) {
	var sensorMsg SensorMessage
	if err := json.Unmarshal(msg.Payload(), &sensorMsg); err != nil {
		log.Printf("⚠️ Invalid sensor message: %v", err)
		return
	}

	// Default timestamp to now if not provided
	ts := time.Now()
	if sensorMsg.Timestamp > 0 {
		ts = time.Unix(sensorMsg.Timestamp, 0)
	}

	// Store reading
	reading := database.Reading{
		GreenhouseID: sensorMsg.GreenhouseID,
		SensorType:   sensorMsg.SensorType,
		SensorID:     sensorMsg.SensorID,
		Value:        sensorMsg.Value,
		Unit:         sensorMsg.Unit,
		Timestamp:    ts,
	}

	if err := h.db.InsertReading(h.ctx, reading); err != nil {
		log.Printf("⚠️ Failed to store reading: %v", err)
		return
	}

	// Check for alerts
	h.checkAlerts(sensorMsg)
}

func (h *Hub) checkAlerts(msg SensorMessage) {
	// Temperature alerts
	if msg.SensorType == "temperature" {
		if msg.Value > 95 {
			h.triggerAlert(msg.GreenhouseID, "temperature_critical",
				"critical", fmt.Sprintf("Temperature critical: %.1f°F! Vent immediately.", msg.Value))
		} else if msg.Value > 85 {
			h.triggerAlert(msg.GreenhouseID, "temperature_high",
				"warning", fmt.Sprintf("Temperature high: %.1f°F. Consider venting.", msg.Value))
		} else if msg.Value < 40 {
			h.triggerAlert(msg.GreenhouseID, "temperature_low",
				"warning", fmt.Sprintf("Temperature low: %.1f°F. Plants may be cold.", msg.Value))
		}
	}

	// Humidity alerts
	if msg.SensorType == "humidity" {
		if msg.Value > 90 {
			h.triggerAlert(msg.GreenhouseID, "humidity_critical",
				"warning", fmt.Sprintf("Humidity very high: %.0f%%. Risk of mold/disease.", msg.Value))
		}
	}

	// Soil moisture alerts
	if msg.SensorType == "soil_moisture" {
		if msg.Value < 20 {
			h.triggerAlert(msg.GreenhouseID, "soil_dry",
				"warning", fmt.Sprintf("Soil very dry: %.0f%%. Water needed soon.", msg.Value))
		}
	}
}

func (h *Hub) triggerAlert(greenhouseID, alertType, severity, message string) {
	log.Printf("🚨 Alert [%s] for %s: %s", severity, greenhouseID, message)
	
	// In production: 
	// 1. Store alert in database
	// 2. Check if should notify (debounce, quiet hours, etc.)
	// 3. Send notification (call user, push notification, etc.)
}

// PublishCommand sends a command to a greenhouse's actuators
func (h *Hub) PublishCommand(greenhouseID string, command Command) error {
	topic := fmt.Sprintf("greenhouse/%s/commands", greenhouseID)
	payload, err := json.Marshal(command)
	if err != nil {
		return err
	}

	token := h.client.Publish(topic, 1, false, payload)
	token.Wait()
	return token.Error()
}

type Command struct {
	Action     string         `json:"action"`
	Target     string         `json:"target"`
	Parameters map[string]any `json:"parameters,omitempty"`
	RequestID  string         `json:"request_id"`
}

// Predefined commands
func IrrigateCommand(zone string, durationMin int) Command {
	return Command{
		Action: "irrigate",
		Target: zone,
		Parameters: map[string]any{
			"duration_minutes": durationMin,
		},
	}
}

func VentCommand(position string) Command {
	return Command{
		Action: "vent",
		Target: "main",
		Parameters: map[string]any{
			"position": position, // "open", "closed", "half"
		},
	}
}

func FanCommand(state bool, speed int) Command {
	return Command{
		Action: "fan",
		Target: "main",
		Parameters: map[string]any{
			"state": state,
			"speed": speed,
		},
	}
}
