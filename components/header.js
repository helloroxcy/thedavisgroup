'use strict';

/* ============================================================
   SHARED HEADER COMPONENT
   Injects the mobile nav overlay + site header into any page.
   Add  <div id="header-mount"></div>  where the header should
   appear (inside your hero foreground layer), then load this
   script at the bottom of <body>.
============================================================ */
(function () {

  /* ── Mobile nav overlay HTML ── */
  var mobileNavHTML = '\
<nav class="mobile-nav" id="mobileNav" aria-label="Mobile navigation" aria-hidden="true">\
  <div class="mobile-nav-hero">\
    <img src="Images/Drone PV 1920x1200.jpg" alt="" aria-hidden="true">\
    <div class="mobile-nav-logo">\
      <img src="Images/TDG-logo-w10bg.svg" alt="The Davis Group">\
    </div>\
    <button class="mobile-nav-close" id="mobileNavClose" aria-label="Close menu">&#215;</button>\
  </div>\
  <div class="mobile-nav-home">\
    <a href="index.html">Home</a>\
  </div>\
  <div class="mobile-nav-links">\
    <a href="index.html#team">Meet The Team</a>\
    <a href="neighborhoods.html">Neighborhoods</a>\
    <a href="index.html#contact">Contact</a>\
  </div>\
</nav>';

  /* ── Header HTML ── */
  var headerHTML = '\
<header id="site-header">\
  <div class="header-inner">\
    <ul class="nav-group">\
      <li><a href="index.html#team">Meet The Team</a></li>\
      <li><a href="neighborhoods.html">Neighborhoods</a></li>\
    </ul>\
    <a class="header-logo" href="index.html">\
      <img src="Images/TDG-logo-w10bg.svg" alt="The Davis Group" width="192">\
    </a>\
    <ul class="nav-group" style="justify-content: flex-end;">\
      <li><a href="index.html#contact">Contact</a></li>\
    </ul>\
    <button class="nav-toggle" id="navToggle" aria-label="Open menu">\
      <span></span><span></span>\
    </button>\
  </div>\
</header>';

  /* ── Inject mobile nav at very top of <body> ── */
  document.body.insertAdjacentHTML('afterbegin', mobileNavHTML);

  /* ── Inject header into mount point ── */
  var mount = document.getElementById('header-mount');
  if (mount) {
    mount.insertAdjacentHTML('afterend', headerHTML);
    mount.parentNode.removeChild(mount);
  }

  /* ── Mobile nav behavior ── */
  var hamburger = document.getElementById('navToggle');
  var overlay   = document.getElementById('mobileNav');
  var closeBtn  = document.getElementById('mobileNavClose');
  if (!hamburger || !overlay || !closeBtn) return;

  var navLinks = overlay.querySelectorAll('a');

  function openNav() {
    overlay.classList.add('open');
    overlay.setAttribute('aria-hidden', 'false');
    hamburger.classList.add('open');
    hamburger.setAttribute('aria-label', 'Close menu');
    document.body.style.overflow = 'hidden';
  }

  function closeNav() {
    overlay.classList.remove('open');
    overlay.setAttribute('aria-hidden', 'true');
    hamburger.classList.remove('open');
    hamburger.setAttribute('aria-label', 'Open menu');
    document.body.style.overflow = '';
  }

  hamburger.addEventListener('click', openNav);
  closeBtn.addEventListener('click', closeNav);
  navLinks.forEach(function (link) {
    link.addEventListener('click', closeNav);
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeNav();
  });

})();
