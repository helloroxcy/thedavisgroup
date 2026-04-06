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
      <a class="social-bar-icon" href="#" aria-label="YouTube">\
        <svg viewBox="0 0 24 24" fill="currentColor"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="white"/></svg>\
      </a>\
      <a class="social-bar-icon" href="#" aria-label="Twitter">\
        <svg viewBox="0 0 24 24" fill="currentColor"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"/></svg>\
      </a>\
      <a class="social-bar-icon" href="#" aria-label="Pinterest">\
        <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12c0 4.24 2.65 7.86 6.39 9.29-.09-.78-.17-1.98.04-2.83.18-.77 1.22-5.17 1.22-5.17s-.31-.63-.31-1.56c0-1.46.85-2.55 1.9-2.55.9 0 1.33.67 1.33 1.48 0 .9-.58 2.26-.87 3.51-.25 1.05.52 1.9 1.55 1.9 1.86 0 3.11-2.39 3.11-5.22 0-2.15-1.45-3.76-4.08-3.76-2.97 0-4.81 2.22-4.81 4.68 0 .85.25 1.45.64 1.91.18.21.2.3.14.54-.05.17-.15.58-.2.74-.07.25-.28.33-.51.24-1.39-.58-2.04-2.14-2.04-3.9 0-2.88 2.43-6.35 7.25-6.35 3.88 0 6.45 2.81 6.45 5.84 0 3.99-2.22 6.96-5.48 6.96-1.1 0-2.13-.59-2.48-1.26l-.67 2.59c-.24.94-.9 2.12-1.34 2.84C12.07 22 12.04 22 12 22c-5.52 0-10-4.48-10-10S6.48 2 12 2z"/></svg>\
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
              <p class="footer-dre">DRE# Bill Davis 01374451<br>Copyright&copy; 2025 The Davis Group<br>All Rights Reserved</p>\
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
            <a href="index.html#team">Meet the Team</a>\
            <a href="index.html#contact">Contact</a>\
            <a href="neighborhoods.html">Neighborhoods</a>\
            <a href="#">Privacy Policy</a>\
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

  /* ── Load contact form handler ── */
  var formsScript   = document.createElement('script');
  formsScript.src   = 'components/forms.js';
  formsScript.defer = true;
  document.body.appendChild(formsScript);

})();
