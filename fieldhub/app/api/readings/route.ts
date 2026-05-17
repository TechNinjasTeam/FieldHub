import { NextResponse } from 'next/server';
import db from '@/lib/db';
import type { SensorReading } from '@/lib/types';

export async function GET() {
  const readings = db
    .prepare('SELECT * FROM sensor_readings ORDER BY recorded_at DESC LIMIT 50')
    .all() as SensorReading[];

  return NextResponse.json({ data: readings });
}
