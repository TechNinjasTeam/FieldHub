import { NextRequest, NextResponse } from 'next/server';
import db from '@/lib/db';

function parseLineProtocol(raw: string): { deviceId: number; temperature: number; humidity: number; lux: number | null } | null {
  try {
    const [measurementPart, fieldsPart] = raw.trim().split(' ');
    if (!measurementPart || !fieldsPart) return null;

    const tagStr = measurementPart.split(',')[1];
    if (!tagStr) return null;

    const deviceId = parseInt(tagStr.split('=')[1]);
    if (isNaN(deviceId)) return null;

    const fields: Record<string, number> = {};
    for (const field of fieldsPart.split(',')) {
      const [k, v] = field.split('=');
      fields[k] = parseFloat(v);
    }

    if (isNaN(fields.temperature) || isNaN(fields.humidity)) return null;

    return {
      deviceId,
      temperature: fields.temperature,
      humidity: fields.humidity,
      lux: fields.lux ?? null,
    };
  } catch {
    return null;
  }
}

export async function POST(req: NextRequest) {
  const body = await req.text();
  const parsed = parseLineProtocol(body);

  if (!parsed) {
    return NextResponse.json({ error: 'invalid payload' }, { status: 400 });
  }

  const { deviceId, temperature, humidity, lux } = parsed;

  const result = db
    .prepare('INSERT INTO sensor_readings (device_id, temperature, humidity, lux) VALUES (?, ?, ?, ?)')
    .run(deviceId, temperature, humidity, lux);

  return NextResponse.json({ data: { id: result.lastInsertRowid } }, { status: 201 });
}
