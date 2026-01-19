export type Dimension = 'E' | 'I' | 'S' | 'N' | 'T' | 'F' | 'J' | 'P';

export interface Option {
  id: string;
  text: string;
  dimension: Dimension;
  value: number; // 1 for primary match
}

export interface Question {
  id: number;
  text: string;
  options: [Option, Option];
}

export interface PersonalityResult {
  code: string; // e.g., "INFJ"
  title: string; // e.g., "The Advocate"
  description: string;
  eegAnalysis?: string; // Simulated insight from EEG
}

export interface EEGDataPoint {
  time: number;
  alpha: number; // Relaxed
  beta: number;  // Active thinking
}

export enum AppPhase {
  INTRO = 'INTRO',
  TEST = 'TEST',
  ANALYZING = 'ANALYZING',
  RESULT = 'RESULT'
}