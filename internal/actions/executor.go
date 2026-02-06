package actions

import (
	"context"
	"encoding/json"
	"fmt"
	"log"

	"github.com/google/uuid"
	"github.com/growtogether/greenhouse-platform/internal/ai"
	"github.com/growtogether/greenhouse-platform/internal/database"
	"github.com/growtogether/greenhouse-platform/internal/sensors"
)

type Executor struct {
	db        *database.DB
	sensorHub *sensors.Hub
}

func NewExecutor(db *database.DB, sensorHub *sensors.Hub) *Executor {
	return &Executor{
		db:        db,
		sensorHub: sensorHub,
	}
}

// Execute processes an AI-generated action
func (e *Executor) Execute(ctx context.Context, greenhouseID string, action ai.Action, triggeredBy string) error {
	// Log the action
	actionID := uuid.New().String()
	params, _ := json.Marshal(action.Parameters)
	
	dbAction := database.Action{
		ID:           actionID,
		GreenhouseID: greenhouseID,
		ActionType:   action.Type,
		Parameters:   string(params),
		Status:       "pending",
		TriggeredBy:  triggeredBy,
	}
	
	if err := e.db.CreateAction(ctx, dbAction); err != nil {
		return fmt.Errorf("failed to log action: %w", err)
	}

	// Execute based on type
	var err error
	var result string

	switch action.Type {
	case "irrigate":
		result, err = e.executeIrrigate(ctx, greenhouseID, action.Parameters)
	case "vent":
		result, err = e.executeVent(ctx, greenhouseID, action.Parameters)
	case "fan":
		result, err = e.executeFan(ctx, greenhouseID, action.Parameters)
	case "set_alert":
		result, err = e.executeSetAlert(ctx, greenhouseID, action.Parameters)
	case "log_event":
		result, err = e.executeLogEvent(ctx, action.Parameters)
	default:
		err = fmt.Errorf("unknown action type: %s", action.Type)
	}

	// Update action status
	status := "completed"
	if err != nil {
		status = "failed"
		result = err.Error()
	}
	
	e.db.UpdateActionStatus(ctx, actionID, status, result)

	if err != nil {
		log.Printf("❌ Action %s failed: %v", action.Type, err)
	} else {
		log.Printf("✅ Action %s completed: %s", action.Type, result)
	}

	return err
}

func (e *Executor) executeIrrigate(ctx context.Context, greenhouseID string, params map[string]any) (string, error) {
	zone, _ := params["zone"].(string)
	if zone == "" {
		zone = "main"
	}
	
	duration := 10 // default 10 minutes
	if d, ok := params["duration_minutes"].(float64); ok {
		duration = int(d)
	}

	cmd := sensors.IrrigateCommand(zone, duration)
	cmd.RequestID = uuid.New().String()

	if err := e.sensorHub.PublishCommand(greenhouseID, cmd); err != nil {
		return "", err
	}

	return fmt.Sprintf("Started irrigation on zone '%s' for %d minutes", zone, duration), nil
}

func (e *Executor) executeVent(ctx context.Context, greenhouseID string, params map[string]any) (string, error) {
	position, _ := params["position"].(string)
	if position == "" {
		position = "open"
	}

	cmd := sensors.VentCommand(position)
	cmd.RequestID = uuid.New().String()

	if err := e.sensorHub.PublishCommand(greenhouseID, cmd); err != nil {
		return "", err
	}

	return fmt.Sprintf("Set vent to '%s'", position), nil
}

func (e *Executor) executeFan(ctx context.Context, greenhouseID string, params map[string]any) (string, error) {
	state, _ := params["state"].(bool)
	speed := 50 // default medium
	if s, ok := params["speed"].(float64); ok {
		speed = int(s)
	}

	cmd := sensors.FanCommand(state, speed)
	cmd.RequestID = uuid.New().String()

	if err := e.sensorHub.PublishCommand(greenhouseID, cmd); err != nil {
		return "", err
	}

	stateStr := "off"
	if state {
		stateStr = fmt.Sprintf("on at %d%%", speed)
	}

	return fmt.Sprintf("Set fan to %s", stateStr), nil
}

func (e *Executor) executeSetAlert(ctx context.Context, greenhouseID string, params map[string]any) (string, error) {
	condition, _ := params["condition"].(string)
	threshold, _ := params["threshold"].(float64)
	message, _ := params["message"].(string)

	// In production: store alert rule in database
	// For now, just acknowledge

	return fmt.Sprintf("Alert set: %s > %.1f will trigger: %s", condition, threshold, message), nil
}

func (e *Executor) executeLogEvent(ctx context.Context, params map[string]any) (string, error) {
	plantID, _ := params["plant_id"].(string)
	eventType, _ := params["event_type"].(string)
	notes, _ := params["notes"].(string)

	// In production: insert into plant_events table
	
	return fmt.Sprintf("Logged %s event for plant %s: %s", eventType, plantID, notes), nil
}
