'use strict';

/* ============================================================
   CONTACT FORM HANDLER — The Davis Group
   Submits via Netlify Forms AJAX and shows an in-page confirmation.
   Loaded automatically on every page via footer.js.
============================================================ */
(function () {

  function handleSubmit(e) {
    e.preventDefault();
    var form = e.currentTarget;
    var btn  = form.querySelector('.form-submit');
    var fd   = new FormData(form);

    btn.textContent = 'Sending\u2026';
    btn.disabled    = true;

    /* Netlify Forms AJAX: POST url-encoded to the same origin */
    var params = new URLSearchParams();
    params.append('form-name', form.getAttribute('name') || 'contact');
    params.append('name',    fd.get('name')    || '');
    params.append('email',   fd.get('email')   || '');
    params.append('city',    fd.get('city')    || '');
    params.append('message', fd.get('message') || '');
    params.append('_honey',  fd.get('_honey')  || '');

    fetch('/', {
      method:  'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body:    params.toString()
    })
    .then(function (res) {
      if (res.ok) {
        showConfirmation(form);
      } else {
        throw new Error('Netlify returned ' + res.status);
      }
    })
    .catch(function () {
      btn.textContent = 'Send';
      btn.disabled    = false;
      showError(form);
    });
  }

  function showConfirmation(form) {
    var conf = document.createElement('div');
    conf.className = 'form-confirmation';
    conf.innerHTML =
      '<div class="form-confirm-check">&#10003;</div>' +
      '<h3 class="form-confirm-title">Message Received</h3>' +
      '<p class="form-confirm-text">Thank you for reaching out to The Davis Group. ' +
      'Bill will personally follow up with you soon \u2014 we look forward to ' +
      'helping you find your perfect South Bay home.</p>';
    form.parentNode.replaceChild(conf, form);
    requestAnimationFrame(function () {
      requestAnimationFrame(function () { conf.classList.add('visible'); });
    });
  }

  function showError(form) {
    var existing = form.querySelector('.form-error-msg');
    if (existing) return;
    var msg = document.createElement('p');
    msg.className = 'form-error-msg';
    msg.style.cssText = 'margin-top:16px;font-family:var(--font-nav);font-size:13px;color:rgba(255,100,80,0.9);letter-spacing:0.3px;';
    msg.textContent = 'Something went wrong. Please email us directly at jondean01@gmail.com';
    form.appendChild(msg);
  }

  /* Attach to every contact form on the page */
  document.querySelectorAll('.contact-form').forEach(function (form) {
    /* Honeypot — hidden from users, catches bots */
    var honey = document.createElement('input');
    honey.type         = 'text';
    honey.name         = '_honey';
    honey.style.cssText = 'display:none!important';
    honey.tabIndex     = -1;
    honey.autocomplete = 'off';
    form.appendChild(honey);

    form.addEventListener('submit', handleSubmit);
  });

})();
