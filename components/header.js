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
    <img src="Images/AdobeStock_211065932.jpeg" alt="" aria-hidden="true">\
    <div class="mobile-nav-logo">\
      <img src="Images/TDG-logo-w10bg.svg" alt="The Davis Group">\
    </div>\
  </div>\
  <div class="mobile-nav-links">\
    <a href="index.html">Home</a>\
    <a href="meet-the-team.html">Meet The Team</a>\
    <a href="neighborhoods.html">Neighborhoods</a>\
    <a href="contact.html">Contact</a>\
  </div>\
</nav>';

  /* ── Header HTML ── */
  var headerHTML = '\
<header id="site-header">\
  <div class="header-inner">\
    <ul class="nav-group">\
      <li><a href="meet-the-team.html">Meet The Team</a></li>\
      <li><a href="neighborhoods.html">Neighborhoods</a></li>\
    </ul>\
    <a class="header-logo" href="index.html">\
      <img src="Images/TDG-logo-w10bg.svg" alt="The Davis Group" width="192">\
    </a>\
    <ul class="nav-group" style="justify-content: flex-end;">\
      <li><a href="contact.html">Contact</a></li>\
    </ul>\
  </div>\
</header>';

  /* ── Hamburger injected directly into <body> so position:fixed
        is relative to the true viewport, not any transformed layer ── */
  var hamburgerHTML = '\
<button class="nav-toggle" id="navToggle" aria-label="Open menu">\
  <span></span><span></span>\
</button>';

  /* ── Inject mobile nav + hamburger at very top of <body> ── */
  document.body.insertAdjacentHTML('afterbegin', hamburgerHTML);
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
  if (!hamburger || !overlay) return;

  var navLinks = overlay.querySelectorAll('a');

  /* ── Mark current page as active ── */
  var currentPage = window.location.pathname.split('/').pop() || 'index.html';
  if (currentPage === '') currentPage = 'index.html';
  navLinks.forEach(function (link) {
    var href = link.getAttribute('href');
    if (href === currentPage) link.classList.add('active');
  });

  function openNav() {
    var siteHeader = document.getElementById('site-header');
    if (siteHeader) {
      siteHeader.style.transition = 'opacity 0.35s ease';
      siteHeader.style.opacity = '0';
    }
    overlay.classList.add('open');
    overlay.setAttribute('aria-hidden', 'false');
    hamburger.classList.add('open');
    hamburger.setAttribute('aria-label', 'Close menu');
    document.body.style.overflow = 'hidden';
  }

  function closeNav() {
    var siteHeader = document.getElementById('site-header');
    if (siteHeader) {
      siteHeader.style.transition = 'opacity 0.35s ease';
      siteHeader.style.opacity = '1';
    }
    overlay.classList.remove('open');
    overlay.setAttribute('aria-hidden', 'true');
    hamburger.classList.remove('open');
    hamburger.setAttribute('aria-label', 'Open menu');
    document.body.style.overflow = '';
  }

  hamburger.addEventListener('click', function () {
    overlay.classList.contains('open') ? closeNav() : openNav();
  });
  navLinks.forEach(function (link) {
    link.addEventListener('click', closeNav);
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeNav();
  });

})();
