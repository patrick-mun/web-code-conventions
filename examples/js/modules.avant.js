import { clamp } from './geometry';

let low = 0,
  high = 10;

export default function limit(value) {
  return clamp(value, low, high);
}
