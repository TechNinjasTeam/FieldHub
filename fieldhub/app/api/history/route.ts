import { NextRequest, NextResponse } from 'next/server';
import db from '@/lib/db';
import type { SensorReading } from '@/lib/types';

const PERIOD_MAP: Record<string, string> = {
  '24h': "datetime('now', '-1 day')",
  '7d':  "datetime('now', '-7 days')",
  '30d': "datetime('now', '-30 days')",
  '90d': "datetime('now', '-90 days')",
};

export async function GET(req: NextRequest) {
  const period = req.nextUrl.searchParams.get('period') ?? '24h';
  const since = PERIOD_MAP[period];

  if (!since) {
    return NextResponse.json({ error: 'invalid period' }, { status: 400 });
  }

  const readings = db
    .prepare(`SELECT * FROM sensor_readings WHERE recorded_at >= ${since} ORDER BY recorded_at ASC`)
    .all() as SensorReading[];

  return NextResponse.json({ data: readings });
}
