import { NextRequest, NextResponse } from 'next/server';
import db from '@/lib/db';

function parseLineProtocol(raw: string): { deviceId: number; temperature: number; humidity: number; lux: number | null } | null {
  try {
    const trimmed = raw.trim();
    const firstSpace = trimmed.indexOf(' ');
    if (firstSpace === -1) return null;

    const measurementPart = trimmed.slice(0, firstSpace);
    const fieldsPart = trimmed.slice(firstSpace + 1);

    const tagStr = measurementPart.split(',')[1];
    if (!tagStr) return null;

    const deviceId = parseInt(tagStr.split('=')[1]);
    if (isNaN(deviceId)) return null;

    const fields: Record<string, number> = {};
    for (const field of fieldsPart.split(',')) {
      const eqIdx = field.indexOf('=');
      if (eqIdx === -1) continue;
      const k = field.slice(0, eqIdx).trim();
      const v = field.slice(eqIdx + 1).trim();
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
