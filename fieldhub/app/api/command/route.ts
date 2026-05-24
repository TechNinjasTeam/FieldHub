import { NextRequest, NextResponse } from 'next/server';
import db from '@/lib/db';
import { publish } from '@/lib/mqtt';
import type { CommandPayload } from '@/lib/types';

const TOPIC_COMMAND = 'irrigacao/comando';

export async function POST(req: NextRequest) {
  const body = await req.json() as { action?: string; device_id?: number };

  if (body.action !== 'ON' && body.action !== 'OFF') {
    return NextResponse.json({ error: 'invalid action' }, { status: 400 });
  }

  const payload: CommandPayload = { action: body.action };
  const deviceId = body.device_id ?? 1;
/*Define o tópico MQ*/
  publish(TOPIC_COMMAND, payload.action);
/*publica on ou off*/
  db.prepare('INSERT INTO irrigation_log (device_id, action, trigger) VALUES (?, ?, ?)')
    .run(deviceId, payload.action, 'manual');

  return NextResponse.json({ data: { action: payload.action } });
}
