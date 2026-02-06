# 🌱 Greenhouse Platform

**Your AI Gardener is a phone number. Call anytime.**

A phone-first greenhouse management platform with AI-powered voice interface, sensor integration, and automated controls.

## Architecture

```
┌─────────────────────────────────────────────────┐
│                 PHONE CALLS                      │
│            Twilio Voice API                      │
└─────────────────────────────────────────────────┘
                        │
                        ↓
┌─────────────────────────────────────────────────┐
│             GO APPLICATION                       │
│  ┌─────────┐  ┌─────────┐  ┌─────────┐         │
│  │ Voice   │  │   AI    │  │ Actions │         │
│  │ Handler │→ │ Engine  │→ │Executor │         │
│  └─────────┘  └─────────┘  └─────────┘         │
│                    │                            │
│         ┌──────────┴──────────┐                │
│         ↓                     ↓                │
│  ┌─────────────┐    ┌─────────────┐            │
│  │   DuckDB    │    │   Ollama    │            │
│  │ (Database)  │    │ (Local LLM) │            │
│  └─────────────┘    └─────────────┘            │
└─────────────────────────────────────────────────┘
                        │
                        ↓
┌─────────────────────────────────────────────────┐
│              SENSOR NETWORK                      │
│     ESP32 → MQTT → Platform → Database          │
└─────────────────────────────────────────────────┘
```

## Quick Start

### Prerequisites
- Docker & Docker Compose
- Twilio account (for voice)
- (Optional) MotherDuck account for cloud database

### Run Locally

```bash
# Copy environment file
cp .env.example .env

# Edit .env with your credentials
vim .env

# Start all services
docker compose up -d

# Check logs
docker compose logs -f gardener
```

### Services

| Service | Port | Description |
|---------|------|-------------|
| gardener | 8080 | Main application |
| ollama | 11434 | Local LLM |
| mosquitto | 1883/9001 | MQTT broker |

## Features

### Voice Interface (Primary)
- Call your AI Gardener's phone number
- Natural conversation about your greenhouse
- Voice commands: "Water zone 2", "How's my temperature?"
- Proactive alerts via outbound calls

### Sensor Integration
- ESP32-based sensor nodes
- Temperature, humidity, soil moisture, light
- Real-time monitoring via MQTT
- Automatic alerts on threshold breaches

### Actions
- Irrigation control
- Vent/fan automation
- Alert configuration
- Plant event logging

### Database (DuckDB/MotherDuck)
- Time-series sensor data
- Conversation history
- Plant tracking
- User profiles

## API Endpoints

### Voice (Twilio Webhooks)
- `POST /voice/incoming` - Handle incoming calls
- `POST /voice/stream` - WebSocket for real-time audio
- `POST /voice/transcription` - Speech-to-text results

### REST API
- `GET /api/v1/greenhouses/:id` - Get greenhouse data
- `GET /api/v1/greenhouses/:id/readings` - Get sensor readings
- `POST /api/v1/greenhouses/:id/actions` - Execute action
- `GET /api/v1/greenhouses/:id/plants` - List plants
- `POST /api/v1/greenhouses/:id/plants` - Add plant

### Health
- `GET /health` - Service health check

## Sensor Protocol

Sensors publish to MQTT topics:
```
greenhouse/{greenhouse_id}/sensors/{sensor_type}
```

Message format:
```json
{
  "greenhouse_id": "gh_123",
  "sensor_id": "temp_01",
  "type": "temperature",
  "value": 72.5,
  "unit": "F",
  "ts": 1707184800
}
```

Commands sent to:
```
greenhouse/{greenhouse_id}/commands
```

## Development

### Project Structure
```
greenhouse-platform/
├── cmd/gardener/          # Main application entry
├── internal/
│   ├── ai/                # AI engine (Ollama integration)
│   ├── voice/             # Twilio voice handling
│   ├── sensors/           # MQTT sensor hub
│   ├── actions/           # Action executor
│   ├── database/          # DuckDB operations
│   └── config/            # Configuration
├── pkg/                   # Shared packages
├── web/                   # Web UI (future)
├── migrations/            # Database migrations
└── scripts/               # Utility scripts
```

### Build from Source
```bash
go mod download
go build -o gardener ./cmd/gardener
./gardener
```

### Run Tests
```bash
go test ./...
```

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| PORT | Server port | 8080 |
| DATABASE_URL | DuckDB connection | duckdb:///data/greenhouse.db |
| MOTHERDUCK_TOKEN | MotherDuck auth | (optional) |
| OLLAMA_URL | Ollama API URL | http://localhost:11434 |
| OLLAMA_MODEL | LLM model | llama3.1:8b |
| MQTT_BROKER | MQTT broker URL | tcp://localhost:1883 |
| TWILIO_ACCOUNT_SID | Twilio SID | (required) |
| TWILIO_AUTH_TOKEN | Twilio token | (required) |
| TWILIO_PHONE_FROM | Outbound number | (required) |

## Roadmap

- [x] Core application structure
- [x] DuckDB integration
- [x] Ollama AI engine
- [x] MQTT sensor hub
- [x] Action executor
- [x] Twilio voice handler
- [ ] Speech-to-text pipeline
- [ ] Text-to-speech pipeline
- [ ] Web UI dashboard
- [ ] ESP32 firmware
- [ ] Mobile app
- [ ] Robot integration

## License

[Your License]

---

**"Call your gardener." That's it.**
