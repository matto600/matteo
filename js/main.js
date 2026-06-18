/* ============================================================
   BRUT — global layout (header/footer) + interactions
   Header and footer live HERE only: edit once, applies to all pages.
   ============================================================ */
(function () {
  'use strict';

  var HEADER = '\
  <header class="site-header">\
    <div class="container">\
      <a class="logo" href="/" aria-label="BRUT — home">\
        <img src="assets/img/Header__sito-26.png" alt="BRUT" width="361" height="98">\
      </a>\
      <nav class="main-nav" aria-label="Principale">\
        <a href="art-brut">ABOUT</a>\
        <a href="lavori">PROGETTI</a>\
        <a href="https://instagram.com" target="_blank" rel="noopener">INSTAGRAM</a>\
        <a class="btn-pill" href="#footer">CONTATTACI</a>\
      </nav>\
      <button class="menu-toggle" id="menuToggle" aria-label="Apri menu" aria-expanded="false" aria-controls="mobileNav">\
        <img src="assets/img/Header__Simbolo_menu-31.png" alt="">\
      </button>\
    </div>\
    <nav class="mobile-nav" id="mobileNav" aria-label="Menu mobile" hidden>\
      <a href="art-brut">ABOUT</a>\
      <a href="lavori">PROGETTI</a>\
      <a href="aziende">CON LE AZIENDE</a>\
      <a href="https://instagram.com" target="_blank" rel="noopener">INSTAGRAM</a>\
      <a href="#footer">CONTATTACI</a>\
    </nav>\
  </header>';

  var FOOTER = '\
  <footer class="site-footer" id="footer">\
    <div class="container">\
      <div class="footer-grid">\
        <div class="footer-left">\
          <a class="footer-ig" href="https://instagram.com" target="_blank" rel="noopener" aria-label="Instagram">\
            <img src="assets/img/Footer__sito-16.png" alt="">\
          </a>\
          <div class="footer-info">\
            <div>Brut Outsider Lab</div>\
            <div>C.F.97965590157</div>\
            <div class="row"><img src="assets/img/Footer__sito-17.png" alt="">Magnete, Via Adriano 107, Milano</div>\
            <div class="row"><img src="assets/img/Footer__sito-18.png" alt="">+39 3479576243</div>\
          </div>\
        </div>\
        <div class="footer-center">\
          <a class="footer-email" href="mailto:lab@brut.milano.it">lab@brut.milano.it</a>\
          <div class="footer-dona">DONA IL 5X1000</div>\
        </div>\
        <a class="footer-logo" href="/" aria-label="BRUT">\
          <img src="assets/img/PaginaArtbrut__sito-28.png" alt="BRUT">\
        </a>\
      </div>\
    </div>\
  </footer>';

  function inject() {
    var h = document.querySelector('[data-include="header"]');
    if (h) h.outerHTML = HEADER;
    var f = document.querySelector('[data-include="footer"]');
    if (f) f.outerHTML = FOOTER;
    markActiveNav();
  }

  // highlight current page in nav
  function markActiveNav() {
    var path = location.pathname.replace(/\/$/, '').split('/').pop() || 'index';
    document.querySelectorAll('.main-nav a, .mobile-nav a').forEach(function (a) {
      var href = a.getAttribute('href');
      if (href === path || (path === 'index' && href === '/')) {
        a.setAttribute('aria-current', 'page');
      }
    });
  }

  // mobile menu
  function initMenu() {
    var toggle = document.getElementById('menuToggle');
    var nav = document.getElementById('mobileNav');
    if (!toggle || !nav) return;
    toggle.addEventListener('click', function () {
      var willOpen = nav.hasAttribute('hidden');
      if (willOpen) nav.removeAttribute('hidden');
      else nav.setAttribute('hidden', '');
      toggle.setAttribute('aria-expanded', String(willOpen));
    });
    nav.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        nav.setAttribute('hidden', '');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // reveal-on-scroll
  function initReveal() {
    var targets = document.querySelectorAll(
      '.section, .artband, .full-photo:not(.hero-photo)'
    );
    if (!('IntersectionObserver' in window) ||
        window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      targets.forEach(function (el) { el.classList.add('is-visible'); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add('is-visible');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    targets.forEach(function (el) { io.observe(el); });
  }

  // smooth scroll via Lenis (well-tuned), keeps sticky header + reveal working
  function initSmoothScroll() {
    var mq = window.matchMedia;
    if (mq('(prefers-reduced-motion: reduce)').matches) return;
    if (typeof Lenis === 'undefined') return;

    var lenis = new Lenis({
      lerp: 0.1,
      wheelMultiplier: 1,
      smoothWheel: true
    });
    function raf(time) { lenis.raf(time); requestAnimationFrame(raf); }
    requestAnimationFrame(raf);

    // in-page anchor links scroll smoothly through Lenis
    document.addEventListener('click', function (e) {
      var a = e.target.closest('a[href^="#"]');
      if (!a) return;
      var id = a.getAttribute('href');
      if (id.length < 2) return;
      var el = document.querySelector(id);
      if (!el) return;
      e.preventDefault();
      lenis.scrollTo(el, { offset: 0, duration: 1.1 });
    });
  }

  function init() {
    inject();
    initMenu();
    initReveal();
    initSmoothScroll();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
