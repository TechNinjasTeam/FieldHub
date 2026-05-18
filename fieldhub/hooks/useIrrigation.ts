'use client';

import { useState, useEffect, useCallback } from 'react';
import { getReadings, sendCommand } from '@/services/irrigationService';
import type { SensorReading } from '@/lib/types';

const POLL_INTERVAL = 10_000;

export function useIrrigation() {
  const [readings, setReadings] = useState<SensorReading[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchReadings = useCallback(async () => {
    const data = await getReadings();
    setReadings(data);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchReadings();
    const interval = setInterval(fetchReadings, POLL_INTERVAL);
    return () => clearInterval(interval);
  }, [fetchReadings]);

  const latestReading = readings[0] ?? null;

  const triggerCommand = useCallback(async (action: 'ON' | 'OFF') => {
    await sendCommand(action);
  }, []);

  return {
    readings,
    latestReading,
    isLoading,
    sendCommand: triggerCommand,
  };
}
