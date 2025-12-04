// src/types/analytics.ts
export interface TimeSeriesPoint {
  timestamp: Date;
  value: number;
  category?: string;
}

export interface CategoryData {
  name: string;
  value: number;
}

export interface GeoPoint {
  name: string;
  coords: [number, number];  // [longitude, latitude]
  value: number;
}

export interface MetricGauge {
  name: string;
  value: number;
  min: number;
  max: number;
  thresholds: { value: number; color: string }[];
}