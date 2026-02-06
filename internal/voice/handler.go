package voice

import (
	"context"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"time"

	"github.com/google/uuid"
	"github.com/gorilla/websocket"
	"github.com/growtogether/greenhouse-platform/internal/ai"
	"github.com/growtogether/greenhouse-platform/internal/config"
	"github.com/growtogether/greenhouse-platform/internal/database"
	"github.com/labstack/echo/v4"
)

type Handler struct {
	config   config.TwilioConfig
	ai       *ai.Engine
	db       *database.DB
	upgrader websocket.Upgrader
}

func NewHandler(cfg config.TwilioConfig, aiEngine *ai.Engine, db *database.DB) *Handler {
	return &Handler{
		config: cfg,
		ai:     aiEngine,
		db:     db,
		upgrader: websocket.Upgrader{
			CheckOrigin: func(r *http.Request) bool { return true },
		},
	}
}

// HandleIncoming handles initial incoming call webhook from Twilio
func (h *Handler) HandleIncoming(c echo.Context) error {
	// Get caller info
	from := c.FormValue("From")
	to := c.FormValue("To")
	callSid := c.FormValue("CallSid")

	log.Printf("📞 Incoming call from %s to %s (CallSid: %s)", from, to, callSid)

	// Look up user by phone number
	user, err := h.db.GetUserByPhone(c.Request().Context(), from)
	if err != nil {
		// New caller - need to onboard
		return h.respondTwiML(c, h.generateOnboardingTwiML())
	}

	// Get user's greenhouse(s)
	greenhouses, err := h.db.GetUserGreenhouses(c.Request().Context(), user.ID)
	if err != nil || len(greenhouses) == 0 {
		return h.respondTwiML(c, h.generateSetupTwiML())
	}

	// Create conversation record
	convID := uuid.New().String()
	h.db.CreateConversation(c.Request().Context(), convID, user.ID, greenhouses[0], "phone")

	// Generate greeting and start streaming conversation
	greeting := h.generateGreeting(user)

	twiml := fmt.Sprintf(`<?xml version="1.0" encoding="UTF-8"?>
<Response>
	<Say voice="Polly.Joanna">%s</Say>
	<Connect>
		<Stream url="wss://%s/voice/stream">
			<Parameter name="conversation_id" value="%s"/>
			<Parameter name="user_id" value="%s"/>
			<Parameter name="greenhouse_id" value="%s"/>
		</Stream>
	</Connect>
</Response>`, greeting, c.Request().Host, convID, user.ID, greenhouses[0])

	return h.respondTwiML(c, twiml)
}

// HandleStream handles the WebSocket stream for real-time voice
func (h *Handler) HandleStream(c echo.Context) error {
	ws, err := h.upgrader.Upgrade(c.Response(), c.Request(), nil)
	if err != nil {
		return err
	}
	defer ws.Close()

	log.Printf("🎙️ Voice stream connected")

	// Track conversation state
	var conversationID, userID, greenhouseID string
	var audioBuffer []byte

	for {
		_, msg, err := ws.ReadMessage()
		if err != nil {
			log.Printf("WebSocket read error: %v", err)
			break
		}

		var event map[string]any
		if err := json.Unmarshal(msg, &event); err != nil {
			continue
		}

		switch event["event"] {
		case "start":
			// Extract parameters
			if start, ok := event["start"].(map[string]any); ok {
				if params, ok := start["customParameters"].(map[string]any); ok {
					conversationID, _ = params["conversation_id"].(string)
					userID, _ = params["user_id"].(string)
					greenhouseID, _ = params["greenhouse_id"].(string)
				}
			}
			log.Printf("Stream started for conversation %s", conversationID)

		case "media":
			// Accumulate audio data
			if media, ok := event["media"].(map[string]any); ok {
				if payload, ok := media["payload"].(string); ok {
					// Decode base64 audio and accumulate
					// In production, stream to speech-to-text service
					audioBuffer = append(audioBuffer, []byte(payload)...)
				}
			}

		case "stop":
			log.Printf("Stream stopped for conversation %s", conversationID)
			// Process final audio, end conversation

		case "mark":
			// Audio playback completed
		}
	}

	return nil
}

// HandleTranscription handles speech-to-text webhook results
func (h *Handler) HandleTranscription(c echo.Context) error {
	// In production, this would receive transcription from a service like
	// Deepgram, AssemblyAI, or Whisper and process it through the AI

	transcription := c.FormValue("TranscriptionText")
	conversationID := c.FormValue("ConversationSid")
	
	log.Printf("📝 Transcription for %s: %s", conversationID, transcription)

	// TODO: Process through AI engine and respond

	return c.NoContent(http.StatusOK)
}

func (h *Handler) generateGreeting(user *database.User) string {
	hour := time.Now().Hour()
	
	var timeGreeting string
	switch {
	case hour < 12:
		timeGreeting = "Good morning"
	case hour < 17:
		timeGreeting = "Good afternoon"
	default:
		timeGreeting = "Good evening"
	}

	// Get current conditions for context
	// In production, would fetch actual sensor data
	
	return fmt.Sprintf("%s, %s! How can I help with your greenhouse today?",
		timeGreeting, user.Name)
}

func (h *Handler) generateOnboardingTwiML() string {
	return `<?xml version="1.0" encoding="UTF-8"?>
<Response>
	<Say voice="Polly.Joanna">
		Hi there! I don't recognize this number yet. 
		It looks like you might be new to the growing network.
		To get set up with your AI gardener, please visit our website or ask whoever sold you your greenhouse to help connect your account.
		Thanks for calling!
	</Say>
	<Hangup/>
</Response>`
}

func (h *Handler) generateSetupTwiML() string {
	return `<?xml version="1.0" encoding="UTF-8"?>
<Response>
	<Say voice="Polly.Joanna">
		Hi! I found your account, but it looks like your greenhouse isn't set up yet.
		Let's get that sorted out. You can set up your greenhouse through our website, or I can walk you through it right now.
		Press 1 to set up now, or press 2 to do it later online.
	</Say>
	<Gather numDigits="1" action="/voice/setup-choice" method="POST">
		<Say>I'll wait.</Say>
	</Gather>
</Response>`
}

func (h *Handler) respondTwiML(c echo.Context, twiml string) error {
	c.Response().Header().Set("Content-Type", "application/xml")
	return c.String(http.StatusOK, twiml)
}

// ProcessVoiceInput takes transcribed text and generates a response
func (h *Handler) ProcessVoiceInput(ctx context.Context, userID, greenhouseID, transcription string) (*ai.Response, error) {
	// Get user
	user, err := h.db.GetUserByPhone(ctx, "") // Would need proper lookup
	if err != nil {
		return nil, err
	}

	// Get current readings
	readings, err := h.db.GetLatestReadings(ctx, greenhouseID)
	if err != nil {
		return nil, err
	}

	readingsMap := make(map[string]float64)
	for _, r := range readings {
		readingsMap[r.SensorType] = r.Value
	}

	// Build context
	gardenerCtx := ai.GardenerContext{
		UserName:        user.Name,
		UserExperience:  user.ExperienceLevel,
		GreenhouseID:    greenhouseID,
		CurrentReadings: readingsMap,
		Plants:          []ai.PlantInfo{}, // Would fetch from DB
		RecentHistory:   []ai.Message{},   // Would fetch recent messages
		CurrentTime:     time.Now().Format("Monday, January 2 3:04 PM"),
		Season:          getSeason(time.Now()),
	}

	// Get AI response
	return h.ai.Chat(ctx, gardenerCtx, transcription)
}

func getSeason(t time.Time) string {
	month := t.Month()
	switch {
	case month >= 3 && month <= 5:
		return "spring"
	case month >= 6 && month <= 8:
		return "summer"
	case month >= 9 && month <= 11:
		return "fall"
	default:
		return "winter"
	}
}
