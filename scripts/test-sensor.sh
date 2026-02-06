#!/bin/bash
# Test script to simulate sensor readings via MQTT

BROKER=${MQTT_BROKER:-localhost}
GREENHOUSE_ID=${1:-gh_test_001}

echo "📡 Sending test sensor data to $BROKER for greenhouse $GREENHOUSE_ID"

# Temperature reading
mosquitto_pub -h $BROKER -t "greenhouse/$GREENHOUSE_ID/sensors/temperature" -m '{
  "greenhouse_id": "'$GREENHOUSE_ID'",
  "sensor_id": "temp_01",
  "type": "temperature",
  "value": 72.5,
  "unit": "F"
}'
echo "🌡️  Temperature: 72.5°F"

# Humidity reading
mosquitto_pub -h $BROKER -t "greenhouse/$GREENHOUSE_ID/sensors/humidity" -m '{
  "greenhouse_id": "'$GREENHOUSE_ID'",
  "sensor_id": "humidity_01",
  "type": "humidity",
  "value": 58.0,
  "unit": "%"
}'
echo "💧 Humidity: 58%"

# Soil moisture reading
mosquitto_pub -h $BROKER -t "greenhouse/$GREENHOUSE_ID/sensors/soil_moisture" -m '{
  "greenhouse_id": "'$GREENHOUSE_ID'",
  "sensor_id": "soil_01",
  "type": "soil_moisture",
  "value": 45.0,
  "unit": "%"
}'
echo "🌱 Soil Moisture: 45%"

# Light reading
mosquitto_pub -h $BROKER -t "greenhouse/$GREENHOUSE_ID/sensors/light" -m '{
  "greenhouse_id": "'$GREENHOUSE_ID'",
  "sensor_id": "light_01",
  "type": "light",
  "value": 8500,
  "unit": "lux"
}'
echo "☀️  Light: 8500 lux"

echo "✅ Test data sent!"
