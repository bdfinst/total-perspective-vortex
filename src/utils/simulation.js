/**
 * Generate a random number from a normal distribution using Box-Muller transform
 */
export function normalRandom(mean, stdDev) {
  let u1, u2
  do {
    u1 = Math.random()
    u2 = Math.random()
  } while (u1 === 0)

  const z0 = Math.sqrt(-2.0 * Math.log(u1)) * Math.cos(2.0 * Math.PI * u2)
  return z0 * stdDev + mean
}

/**
 * Create a new work item
 */
export function createWorkItem(type, tick) {
  return {
    id: Math.random().toString(36).substr(2, 6).toUpperCase(),
    type,
    stepIndex: 0,
    state: 'QUEUE',
    progress: 0,
    createdAt: tick,
    valueAddedTime: 0,
    queueEnteredAt: tick,
  }
}

/**
 * Utility for merging Tailwind classes
 */
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}
