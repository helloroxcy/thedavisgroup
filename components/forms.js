'use strict';

/* ============================================================
   CONTACT FORM, The Davis Group
   Pure HTML POST to Netlify Forms. This script only adds the
   honeypot anti-spam field; the browser handles submission
   natively for maximum reliability.
   Loaded automatically on every page via footer.js.
============================================================ */
(function () {

  document.querySelectorAll('.contact-form').forEach(function (form) {
    /* Honeypot, hidden from users, catches bots */
    var honey = document.createElement('input');
    honey.type         = 'text';
    honey.name         = '_honey';
    honey.style.cssText = 'display:none!important';
    honey.tabIndex     = -1;
    honey.autocomplete = 'off';
    form.appendChild(honey);
  });

})();
