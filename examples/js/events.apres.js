/* ── POSITION DE DÉFILEMENT ─────────────────
   Expose le défilement au CSS via --scroll-y, au plus une fois par image.
*/
let isTicking = false;

function handleScroll() {
  if (isTicking) return;
  isTicking = true;
  requestAnimationFrame(() => {
    document.documentElement.style.setProperty('--scroll-y', String(window.scrollY));
    isTicking = false;
  });
}

window.addEventListener('scroll', handleScroll, { passive: true });

const menuButton = document.querySelector('.js-menu-toggle');
if (menuButton) {
  menuButton.addEventListener('click', () => {
    menuButton.classList.toggle('is-open');
  });
}
