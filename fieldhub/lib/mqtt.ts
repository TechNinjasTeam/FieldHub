import mqtt, { MqttClient } from 'mqtt';

const BROKER_URL = `wss://${process.env.NEXT_PUBLIC_MQTT_HOST}:${process.env.NEXT_PUBLIC_MQTT_PORT ?? 8884}/mqtt`;
const TOPIC_SENSORS = 'irrigacao/sensores';

declare global {

  var _mqttClient: MqttClient | undefined;
}

function getClient(): MqttClient {
  if (global._mqttClient?.connected) return global._mqttClient;
  if (global._mqttClient) {
    global._mqttClient.end(true);
    global._mqttClient = undefined;
  }

  const client = mqtt.connect(BROKER_URL, {
    username: process.env.MQTT_USERNAME,
    password: process.env.MQTT_PASSWORD,
    rejectUnauthorized: true,
  });

  client.on('connect', () => {
    client.subscribe(TOPIC_SENSORS);
  });

  client.on('error', () => {});

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
  client.publish(topic, payload, { qos: 1 });
}
