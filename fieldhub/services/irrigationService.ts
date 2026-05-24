import type { SensorReading } from '@/lib/types';

export type Period = '24h' | '7d' | '30d' | '90d';

export async function getReadings(): Promise<SensorReading[]> {
  const res = await fetch('/api/readings');
  const { data } = await res.json();
  return data;
}

export async function getHistory(period: Period): Promise<SensorReading[]> {
  const res = await fetch(`/api/history?period=${period}`);
  const { data } = await res.json();
  return data;
}

export async function sendCommand(action: 'ON' | 'OFF'): Promise<void> {
  await fetch('/api/command', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ action }),
  });
}
