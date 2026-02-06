# Build stage
FROM golang:1.22-alpine AS builder

WORKDIR /app

# Install build dependencies
RUN apk add --no-cache gcc musl-dev

# Copy go mod files
COPY go.mod go.sum ./
RUN go mod download

# Copy source
COPY . .

# Build
RUN CGO_ENABLED=1 go build -o gardener ./cmd/gardener

# Runtime stage
FROM alpine:latest

RUN apk add --no-cache ca-certificates tzdata

WORKDIR /app

# Copy binary
COPY --from=builder /app/gardener .

# Copy web assets (if built)
COPY --from=builder /app/web/dist ./web/dist 2>/dev/null || true

# Create data directory
RUN mkdir -p /data

EXPOSE 8080

ENV PORT=8080
ENV DATABASE_URL="duckdb:///data/greenhouse.db"

CMD ["./gardener"]
