/* ============================================================
   assets/js/geometry.js
   Rôle : calculs géométriques réutilisables par les animations.
   Pages concernées : accueil.
   Accroches : aucune (module de calcul pur).
   ============================================================ */

/**
 * Limite une valeur à l'intervalle [min, max].
 * @param {number} value - valeur à limiter
 * @param {number} min - borne basse
 * @param {number} max - borne haute
 * @returns {number} la valeur limitée
 */
export function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}
