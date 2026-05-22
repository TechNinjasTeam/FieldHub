'use client';

import { useState, useEffect } from 'react';
import { getHistory } from '@/services/irrigationService';
import type { Period } from '@/services/irrigationService';
import type { SensorReading } from '@/lib/types';

export function useHistory(period: Period) {
  const [data, setData] = useState<SensorReading[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    getHistory(period).then((d) => {
      setData(d);
      setIsLoading(false);
    });
  }, [period]);

  return { data, isLoading };
}
