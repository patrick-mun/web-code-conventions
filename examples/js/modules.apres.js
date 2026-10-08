import { clamp } from './geometry.js';

const LOW = 0;
const HIGH = 10;

/**
 * Limite une valeur à l'intervalle fixé pour la page.
 * @param {number} value - valeur à limiter
 * @returns {number} la valeur limitée
 */
export function limit(value) {
  return clamp(value, LOW, HIGH);
}
