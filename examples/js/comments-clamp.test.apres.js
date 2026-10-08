import assert from 'node:assert/strict';
import { test } from 'node:test';
import { clamp } from './comments.apres.js';

test('clamp garde une valeur déjà comprise dans l’intervalle', () => {
  assert.equal(clamp(5, 0, 10), 5);
});

test('clamp ramène une valeur trop basse à la borne basse', () => {
  assert.equal(clamp(-3, 0, 10), 0);
});

test('clamp ramène une valeur trop haute à la borne haute', () => {
  assert.equal(clamp(42, 0, 10), 10);
});
