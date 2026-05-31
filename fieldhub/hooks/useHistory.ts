'use client';

import { useState, useEffect, useCallback } from 'react';
import { getHistory, type Period } from '@/services/irrigationService';
import type { SensorReading } from '@/lib/types';

const POLL_INTERVAL = 10_000;

export function useHistory(period: Period) {
  const [history, setHistory] = useState<SensorReading[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetch = useCallback(async () => {
    const data = await getHistory(period);
    setHistory(data);
    setIsLoading(false);
  }, [period]);

  useEffect(() => {
    setIsLoading(true);
    fetch();
    const timer = setInterval(fetch, POLL_INTERVAL);
    return () => clearInterval(timer);
  }, [fetch]);

  return { history, isLoading };
}
