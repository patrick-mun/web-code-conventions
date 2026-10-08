function update() {
  document.documentElement.style.setProperty('--scroll-y', String(window.scrollY));
}
document.addEventListener('scroll', update);
document.querySelector('.menu').onclick = function () {
  console.log('clic');
};
