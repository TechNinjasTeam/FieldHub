export type SensorReading = {
  id: number;
  device_id: number;
  temperature: number;
  humidity: number;
  lux: number | null;
  recorded_at: string;
};

export type IrrigationLog = {
  id: number;
  device_id: number;
  action: 'ON' | 'OFF';
  trigger: 'manual' | 'auto';
  created_at: string;
};

export type CommandPayload = {
  action: 'ON' | 'OFF';
};
