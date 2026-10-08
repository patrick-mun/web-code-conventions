const MAX_ITEMS = 5;
let isMenuOpen = false;

/**
 * Bascule l'état ouvert du menu et indique s'il dépasse la limite d'éléments.
 * @param {Element[]} items - éléments du menu
 * @returns {boolean} vrai si le menu contient trop d'éléments
 */
export function toggleMenu(items) {
  isMenuOpen = !isMenuOpen;
  return isMenuOpen && items.length > MAX_ITEMS;
}
