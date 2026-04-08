'use strict';

/* ============================================================
   SHARED FOOTER COMPONENT
   Injects the pre-footer social bar + site footer into any page.
   Add  <div id="footer-mount"></div>  where the footer should
   appear, then load this script at the bottom of <body>.
============================================================ */
(function () {

  var footerHTML = '\
<!-- Social icons bar -->\
<div class="social-bar">\
  <div class="social-bar-inner">\
    <div class="social-bar-line"></div>\
    <div class="social-bar-icons">\
      <a class="social-bar-icon" href="#" aria-label="Facebook">\
        <svg viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>\
      </a>\
      <a class="social-bar-icon" href="#" aria-label="Instagram">\
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="0.6" fill="currentColor"/></svg>\
      </a>\
      <a class="social-bar-icon" href="#" aria-label="Twitter">\
        <svg viewBox="0 0 24 24" fill="currentColor"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"/></svg>\
      </a>\
      <a class="social-bar-icon" href="#" aria-label="LinkedIn">\
        <svg viewBox="0 0 24 24" fill="currentColor"><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/></svg>\
      </a>\
    </div>\
    <div class="social-bar-line"></div>\
  </div>\
</div>\
\
<!-- Footer -->\
<footer>\
  <div class="footer-dark">\
    <div class="wrap">\
\
      <div class="footer-logo-area">\
        <a href="index.html">\
          <img src="Images/TDG-logo-w10bg.svg" alt="The Davis Group">\
        </a>\
      </div>\
\
      <div class="footer-cols">\
\
        <div class="footer-left">\
          <a class="footer-dir-label" href="https://www.google.com/maps/search/?api=1&query=450+Silver+Spur+Road+Palos+Verdes+CA+90275" target="_blank" rel="noopener" style="display:block;">Get Directions</a>\
          <p class="footer-address">450 Silver Spur Road, Palos Verdes, CA 90275</p>\
          <div class="footer-small-cols">\
            <div>\
              <p class="footer-disclaimer">While some of the listings on our site may not be exclusive, we have ongoing relationships with all of the listing agents.</p>\
              <p class="footer-dre">DRE# Bill Davis 01374451<br>BRE# Jennifer Sambito 01328628<br>Copyright&copy; <span id="footer-year"></span> The Davis Group<br>All Rights Reserved</p>\
            </div>\
            <div>\
              <p class="footer-legal">All material presented herein is intended for information purposes only. While this information is believed to be correct, it is represented subject to errors, omissions, changes or withdrawal without notice. All property information, including, but not limited to square footage, room count, number of bedrooms and the school district in property listings should be verified by your own attorney, architect or zoning expert.</p>\
            </div>\
          </div>\
        </div>\
\
        <div>\
          <p class="footer-phone"><a href="tel:+13109208812" style="color:inherit;">(310) 920-8812</a></p>\
          <p class="footer-email-link"><a href="mailto:billdavishomes@me.com" style="color:inherit;">billdavishomes@me.com</a></p>\
          <nav class="footer-nav">\
            <a href="meet-the-team.html">Meet the Team</a>\
            <a href="index.html#contact">Contact</a>\
            <a href="neighborhoods.html">Neighborhoods</a>\
            <a href="privacy-policy.html">Privacy Policy</a>\
          </nav>\
          <p class="footer-attr">Real Estate Website Design by jondean</p>\
          <div class="footer-badges">\
            <img src="Images/Realty_Logos@3x.png" alt="MLS, Equal Housing, Realtor" loading="lazy">\
          </div>\
        </div>\
\
      </div>\
    </div>\
  </div>\
</footer>';

  /* ── Inject footer into mount point ── */
  var mount = document.getElementById('footer-mount');
  if (mount) {
    mount.insertAdjacentHTML('afterend', footerHTML);
    mount.parentNode.removeChild(mount);
  }

  /* ── Auto-update copyright year ── */
  var yearEl = document.getElementById('footer-year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ── Load contact form handler ── */
  var formsScript   = document.createElement('script');
  formsScript.src   = 'components/forms.js';
  formsScript.defer = true;
  document.body.appendChild(formsScript);

})();
