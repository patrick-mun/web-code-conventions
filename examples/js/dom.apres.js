/* ── RÉVÉLATION DU TITRE ─────────────────
   Le titre apparaît au défilement. Accroche : .js-hero-title.
   Le CSS lit --reveal ; il pose l'état final avec .is-revealed.
*/
const SCROLL_RANGE_PX = 800; // distance de défilement qui révèle entièrement le titre
const userName = 'Camille';

const title = document.querySelector('.js-hero-title');
if (title) {
  title.textContent = userName;
  window.addEventListener(
    'scroll',
    () => {
      const progress = Math.min(window.scrollY / SCROLL_RANGE_PX, 1);
      title.style.setProperty('--reveal', progress);
      title.classList.toggle('is-revealed', progress === 1);
    },
    { passive: true },
  );
}
