import mqtt, { MqttClient } from 'mqtt';

const BROKER_URL = `mqtts://${process.env.MQTT_HOST}:${process.env.MQTT_PORT ?? 8883}`;
const TOPIC_SENSORS = 'irrigacao/sensores';

declare global {
  // eslint-disable-next-line no-var
  var _mqttClient: MqttClient | undefined;
}

function getClient(): MqttClient {
  if (global._mqttClient) return global._mqttClient;

  const client = mqtt.connect(BROKER_URL, {
    username: process.env.MQTT_USER,
    password: process.env.MQTT_PASS,
    rejectUnauthorized: true,
  });

  client.on('connect', () => {
    client.subscribe(TOPIC_SENSORS);
  });

  client.on('message', async (_topic, message) => {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? 'http://localhost:3000';
    await fetch(`${baseUrl}/api/telemetry`, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain' },
      body: message.toString(),
    });
  });

  global._mqttClient = client;
  return client;
}

const client = getClient();

export function publish(topic: string, payload: string): void {
  client.publish(topic, payload);
}
