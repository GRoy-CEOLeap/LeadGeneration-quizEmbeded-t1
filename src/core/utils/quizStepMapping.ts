const CHARS = 'abcdefghijklmnopqrstuvwxyz0123456789';
const SEED = 'PI_QUIZ_2025';

function simpleHash(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return Math.abs(hash);
}

function generateDeterministicId(stepNumber: number, length: number = 5): string {
  const input = `${SEED}_${stepNumber}`;
  const hash = simpleHash(input);

  let result = '';
  let currentHash = hash;

  for (let i = 0; i < length; i++) {
    const index = currentHash % CHARS.length;
    result += CHARS.charAt(index);
    currentHash = Math.floor(currentHash / CHARS.length) + simpleHash(result);
  }

  return result;
}

export interface StepMapping {
  [stepNumber: number]: string;
}

export interface ReverseStepMapping {
  [id: string]: number;
}

export function initializeStepMapping(totalSteps: number): { forward: StepMapping; reverse: ReverseStepMapping } {
  const forward: StepMapping = {};
  const reverse: ReverseStepMapping = {};

  for (let step = 1; step <= totalSteps; step++) {
    const id = generateDeterministicId(step);
    forward[step] = id;
    reverse[id] = step;
  }

  console.log('Step mapping generated (deterministic):', forward);
  return { forward, reverse };
}

export function getStepId(stepNumber: number, totalSteps: number): string | null {
  const mapping = initializeStepMapping(totalSteps);
  const id = mapping.forward[stepNumber] || null;
  console.log(`getStepId(${stepNumber}) -> ${id}`);
  return id;
}

export function getStepNumber(id: string, totalSteps: number): number | null {
  const mapping = initializeStepMapping(totalSteps);
  const stepNumber = mapping.reverse[id] || null;
  console.log(`getStepNumber(${id}) -> ${stepNumber}`);
  return stepNumber;
}

export function clearStepMapping(): void {
  // No-op: deterministic mapping doesn't need clearing
}

export function getStepMapping(totalSteps: number): { forward: StepMapping; reverse: ReverseStepMapping } {
  return initializeStepMapping(totalSteps);
}
