package ai

import (
	"bytes"
	"context"
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"strings"
)

type Engine struct {
	ollamaURL string
	model     string
	client    *http.Client
}

func NewEngine(ollamaURL, model string) (*Engine, error) {
	return &Engine{
		ollamaURL: ollamaURL,
		model:     model,
		client:    &http.Client{},
	}, nil
}

// GardenerContext holds everything the AI needs to know for a response
type GardenerContext struct {
	UserName        string
	UserExperience  string
	GreenhouseID    string
	CurrentReadings map[string]float64 // sensor_type -> value
	Plants          []PlantInfo
	RecentHistory   []Message
	CurrentTime     string
	Season          string
}

type PlantInfo struct {
	Name       string
	Variety    string
	DaysOld    int
	Status     string
	NextAction string
}

type Message struct {
	Role    string `json:"role"`
	Content string `json:"content"`
}

// Action represents a function call the AI wants to execute
type Action struct {
	Type       string         `json:"type"`
	Parameters map[string]any `json:"parameters,omitempty"`
	Reasoning  string         `json:"reasoning,omitempty"`
}

type Response struct {
	Text    string   `json:"text"`
	Actions []Action `json:"actions,omitempty"`
}

const systemPrompt = `You are an AI Gardener - a warm, knowledgeable, patient companion helping someone grow food in their greenhouse.

PERSONALITY:
- Warm and encouraging, never condescending
- Patient - gardening takes time, and so do explanations
- Celebratory of wins, gentle about failures
- Speaks naturally, like a friend who loves plants
- Adapts to the user's experience level

CONTEXT PROVIDED:
- User's name and experience level
- Current sensor readings (temperature, humidity, soil moisture, light)
- Active plants and their status
- Recent conversation history

CAPABILITIES (Function Calling):
When the user asks you to DO something, respond with the action in this format:
ACTION: {"type": "action_name", "parameters": {...}}

Available actions:
- irrigate: Water a zone. Params: zone (string), duration_minutes (int)
- set_alert: Create an alert. Params: condition (string), threshold (float), message (string)
- log_event: Log a plant event. Params: plant_id (string), event_type (string), notes (string)
- adjust_climate: Change settings. Params: target_temp (float), vent_position (string)

RESPONSE FORMAT:
Respond naturally to the user. If an action is needed, include it at the END of your response.
Keep responses concise but warm - this is a phone conversation.

Remember: You KNOW this person. You KNOW their garden. Reference specifics when relevant.`

func (e *Engine) buildPrompt(ctx GardenerContext, userMessage string) string {
	var sb strings.Builder

	// System context
	sb.WriteString(systemPrompt)
	sb.WriteString("\n\n---\n\n")

	// User context
	sb.WriteString(fmt.Sprintf("USER: %s (Experience: %s)\n", ctx.UserName, ctx.UserExperience))
	sb.WriteString(fmt.Sprintf("TIME: %s (%s)\n", ctx.CurrentTime, ctx.Season))
	sb.WriteString(fmt.Sprintf("GREENHOUSE: %s\n\n", ctx.GreenhouseID))

	// Current readings
	sb.WriteString("CURRENT CONDITIONS:\n")
	for sensor, value := range ctx.CurrentReadings {
		sb.WriteString(fmt.Sprintf("- %s: %.1f\n", sensor, value))
	}
	sb.WriteString("\n")

	// Plants
	if len(ctx.Plants) > 0 {
		sb.WriteString("ACTIVE PLANTS:\n")
		for _, p := range ctx.Plants {
			sb.WriteString(fmt.Sprintf("- %s (%s): Day %d, %s. Next: %s\n",
				p.Name, p.Variety, p.DaysOld, p.Status, p.NextAction))
		}
		sb.WriteString("\n")
	}

	// Recent history
	if len(ctx.RecentHistory) > 0 {
		sb.WriteString("RECENT CONVERSATION:\n")
		for _, m := range ctx.RecentHistory {
			sb.WriteString(fmt.Sprintf("%s: %s\n", m.Role, m.Content))
		}
		sb.WriteString("\n")
	}

	// Current message
	sb.WriteString(fmt.Sprintf("USER NOW: %s\n\nYOUR RESPONSE:", userMessage))

	return sb.String()
}

func (e *Engine) Chat(ctx context.Context, gardenerCtx GardenerContext, userMessage string) (*Response, error) {
	prompt := e.buildPrompt(gardenerCtx, userMessage)

	// Call Ollama
	reqBody := map[string]any{
		"model":  e.model,
		"prompt": prompt,
		"stream": false,
		"options": map[string]any{
			"temperature": 0.7,
			"num_predict": 500,
		},
	}

	body, _ := json.Marshal(reqBody)
	req, err := http.NewRequestWithContext(ctx, "POST", e.ollamaURL+"/api/generate", bytes.NewReader(body))
	if err != nil {
		return nil, err
	}
	req.Header.Set("Content-Type", "application/json")

	resp, err := e.client.Do(req)
	if err != nil {
		return nil, fmt.Errorf("ollama request failed: %w", err)
	}
	defer resp.Body.Close()

	respBody, _ := io.ReadAll(resp.Body)

	var ollamaResp struct {
		Response string `json:"response"`
	}
	if err := json.Unmarshal(respBody, &ollamaResp); err != nil {
		return nil, fmt.Errorf("failed to parse ollama response: %w", err)
	}

	// Parse response for actions
	return e.parseResponse(ollamaResp.Response), nil
}

func (e *Engine) parseResponse(raw string) *Response {
	resp := &Response{
		Text:    raw,
		Actions: []Action{},
	}

	// Look for ACTION: {...} patterns
	if idx := strings.Index(raw, "ACTION:"); idx != -1 {
		resp.Text = strings.TrimSpace(raw[:idx])
		actionPart := strings.TrimSpace(raw[idx+7:])

		// Find JSON object
		if start := strings.Index(actionPart, "{"); start != -1 {
			depth := 0
			end := start
			for i := start; i < len(actionPart); i++ {
				if actionPart[i] == '{' {
					depth++
				} else if actionPart[i] == '}' {
					depth--
					if depth == 0 {
						end = i + 1
						break
					}
				}
			}

			var action Action
			if err := json.Unmarshal([]byte(actionPart[start:end]), &action); err == nil {
				resp.Actions = append(resp.Actions, action)
			}
		}
	}

	return resp
}

// Quick response for simple queries (status checks, etc.)
func (e *Engine) QuickStatus(ctx GardenerContext) string {
	var parts []string

	// Temperature
	if temp, ok := ctx.CurrentReadings["temperature"]; ok {
		if temp > 85 {
			parts = append(parts, fmt.Sprintf("It's getting warm in there - %.0f degrees.", temp))
		} else if temp < 50 {
			parts = append(parts, fmt.Sprintf("A bit chilly at %.0f degrees.", temp))
		} else {
			parts = append(parts, fmt.Sprintf("Temperature's good at %.0f degrees.", temp))
		}
	}

	// Humidity
	if humidity, ok := ctx.CurrentReadings["humidity"]; ok {
		if humidity > 80 {
			parts = append(parts, "Humidity's high - might want to vent.")
		} else if humidity < 40 {
			parts = append(parts, "Air's a bit dry.")
		}
	}

	// Soil moisture
	if soil, ok := ctx.CurrentReadings["soil_moisture"]; ok {
		if soil < 30 {
			parts = append(parts, "Soil's getting dry - time to water soon.")
		}
	}

	if len(parts) == 0 {
		return "Everything's looking good in there!"
	}

	return strings.Join(parts, " ")
}
