var userName = 'Camille';
var el = document.getElementById('hero-title');
window.onscroll = function () {
  var p = window.scrollY / 8;
  if (p == 100) { el.style.opacity = 1; }
  el.innerHTML = '<b>' + userName + '</b>';
};
