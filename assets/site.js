/* ==========================================================================
   Excellence Medical — site behaviour
   No dependencies. One front page: menu links scroll to its sections, treatment links are placeholders
   for the demo (data-dummy), and Mr Roy's profile opens in a dialog.
   ========================================================================== */
(function () {
  'use strict';

  var CLINIC_EMAIL = 'info@excellencemedical.ie';
  var TZ = 'Europe/Dublin';
  // 0 = Sunday … 6 = Saturday; hours in 24h decimal, null = closed
  var HOURS = { 0: null, 1: [10.5, 16.5], 2: [10.5, 16.5], 3: [10.5, 16.5], 4: [10.5, 16.5], 5: [10.5, 16.5], 6: null };
  var DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var behavior = reduceMotion ? 'auto' : 'smooth';
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };

  /* ---------- header shadow ---------- */
  var header = $('.site-header');
  if (header) {
    var onScroll = function () { header.classList.toggle('is-scrolled', window.scrollY > 8); };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ---------- drop-downs and mega menus ---------- */
  var canHover = window.matchMedia('(hover: hover)').matches;
  var toggles = $$('[data-dropdown]');
  function setMenu(btn, open) {
    btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    var m = document.getElementById(btn.getAttribute('aria-controls'));
    if (m) m.classList.toggle('is-open', open);
  }
  function closeAll(except) { toggles.forEach(function (b) { if (b !== except) setMenu(b, false); }); }
  toggles.forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      e.stopPropagation();
      var open = btn.getAttribute('aria-expanded') !== 'true';
      closeAll(btn); setMenu(btn, open);
    });
    if (!canHover) return;
    var li = btn.parentElement, t;
    li.addEventListener('mouseenter', function () { clearTimeout(t); closeAll(btn); setMenu(btn, true); });
    li.addEventListener('mouseleave', function () { t = setTimeout(function () { setMenu(btn, false); }, 160); });
  });
  document.addEventListener('click', function (e) { if (!e.target.closest('.nav-links')) closeAll(); });
  document.addEventListener('focusin', function (e) { if (!e.target.closest('.nav-links')) closeAll(); });

  /* ---------- mobile drawer ---------- */
  var drawer = $('#drawer');
  var opener = $('.menu-toggle');
  function setDrawer(open) {
    if (!drawer || drawer.classList.contains('is-open') === open) return;
    drawer.classList.toggle('is-open', open);
    drawer.setAttribute('aria-hidden', open ? 'false' : 'true');
    if (opener) opener.setAttribute('aria-expanded', open ? 'true' : 'false');
    document.body.style.overflow = open ? 'hidden' : '';
    if (open) { var f = $('.drawer-close', drawer); if (f) f.focus(); }
  }
  if (opener) opener.addEventListener('click', function () { setDrawer(true); });
  $$('[data-drawer-close]').forEach(function (el) { el.addEventListener('click', function () { setDrawer(false); }); });

  // following a link inside a menu closes the menu; placeholder links (data-dummy) go nowhere
  document.addEventListener('click', function (e) {
    if (!e.target.closest) return;
    if (e.target.closest('[data-dummy]')) { e.preventDefault(); closeAll(); setDrawer(false); return; }
    if (e.target.closest('.dd a')) closeAll();
    if (e.target.closest('#drawer a')) setDrawer(false);
  });

  /* ---------- open now (clinic time in Dublin, not visitor time) ---------- */
  function clinicNow() {
    var parts = new Intl.DateTimeFormat('en-GB', { timeZone: TZ, weekday: 'short', hour: '2-digit', minute: '2-digit', hourCycle: 'h23' }).formatToParts(new Date());
    var get = function (t) { return (parts.filter(function (p) { return p.type === t; })[0] || {}).value; };
    var day = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].indexOf(get('weekday'));
    return { day: day, t: +get('hour') + (+get('minute')) / 60 };
  }
  function fmt(h) {
    var hh = Math.floor(h), mm = Math.round((h - hh) * 60), ap = hh >= 12 ? 'PM' : 'AM';
    return (hh % 12 || 12) + (mm ? ':' + String(mm).padStart(2, '0') : '') + ' ' + ap;
  }
  function openStatus() {
    var now = clinicNow(), h = HOURS[now.day];
    if (h && now.t >= h[0] && now.t < h[1]) return { open: true, text: 'Open now · until ' + fmt(h[1]) };
    if (h && now.t < h[0]) return { open: false, text: 'Closed · opens ' + fmt(h[0]) + ' today' };
    for (var i = 1; i <= 7; i++) {
      var d = (now.day + i) % 7;
      if (HOURS[d]) return { open: false, text: 'Closed · opens ' + fmt(HOURS[d][0]) + (i === 1 ? ' tomorrow' : ' ' + DAYS[d]) };
    }
  }
  var st = openStatus();
  $$('[data-open-badge]').forEach(function (el) { el.textContent = st.text; el.classList.toggle('is-open', st.open); });
  var today = clinicNow().day;
  $$('[data-day]').forEach(function (row) { if (+row.getAttribute('data-day') === today) row.classList.add('is-today'); });

  /* ---------- tabs (concern finder, treatment menus) ---------- */
  $$('[data-tabs]').forEach(function (box) {
    var tabs = $$('[role="tab"]', box);
    if (!tabs.length) return;
    function show(tab, focus, user) {
      var panel;
      tabs.forEach(function (t) {
        var on = t === tab;
        t.setAttribute('aria-selected', on ? 'true' : 'false');
        t.tabIndex = on ? 0 : -1;
        var p = document.getElementById(t.getAttribute('aria-controls'));
        if (p) { p.hidden = !on; if (on) panel = p; }
      });
      if (focus) tab.focus();
      if (user && panel && window.innerWidth <= 900) {
        var r = panel.getBoundingClientRect();
        if (r.top > window.innerHeight * 0.7 || r.bottom < 80) panel.scrollIntoView({ behavior: behavior, block: 'start' });
      }
    }
    tabs.forEach(function (t, i) {
      t.addEventListener('click', function () { show(t, false, true); });
      t.addEventListener('keydown', function (e) {
        var j = { ArrowDown: i + 1, ArrowRight: i + 1, ArrowUp: i - 1, ArrowLeft: i - 1, Home: 0, End: tabs.length - 1 }[e.key];
        if (j === undefined) return;
        e.preventDefault();
        show(tabs[(j + tabs.length) % tabs.length], true, false);
      });
    });
    show(tabs.filter(function (t) { return t.getAttribute('aria-selected') === 'true'; })[0] || tabs[0], false, false);
  });

  /* ---------- the clinic tour video ----------
     The Desktop copy carries the clip inside the file (base64), turned into a playable blob once the page has
     loaded; the hosted page streams it from data-src. It plays muted while on screen; with reduced motion or
     Data Saver it waits for the play button. */
  var tourUrl = null;
  function tourSrc(v) {
    if (tourUrl) return tourUrl;
    var el = $('#tour-data');
    // hosted page: phones get the lighter cut, as on Origin Dental
    if (!el) return (window.matchMedia('(max-width: 640px)').matches && v.getAttribute('data-src-phone')) || v.getAttribute('data-src') || '';
    var bin = atob(el.textContent.trim()), bytes = new Uint8Array(bin.length);
    for (var i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
    tourUrl = URL.createObjectURL(new Blob([bytes], { type: 'video/mp4' }));
    return tourUrl;
  }
  var conn = navigator.connection || {};
  var lowData = conn.saveData || /2g/.test(conn.effectiveType || '');
  var whenIdle = function (fn) { if ('requestIdleCallback' in window) requestIdleCallback(fn, { timeout: 1500 }); else setTimeout(fn, 200); };
  $$('[data-video]').forEach(function (v) {
    // the play/pause button sits beside the video, or elsewhere with data-controls="<video id>"
    var btn = (v.id && $('[data-controls="' + v.id + '"]')) || v.parentElement.querySelector('.video-btn');
    var label = btn && btn.querySelector('[data-label]');
    var playText = label ? label.textContent : '';
    var playIcon = btn && btn.querySelector('.ic-play');
    var pauseIcon = btn && btn.querySelector('.ic-pause');
    var loaded = false, userPaused = false, inView = false, ready = !v.hasAttribute('data-after-load');
    var auto = !reduceMotion && !lowData;
    var load = function () { if (!loaded) { loaded = true; v.src = tourSrc(v); } };
    var play = function () { load(); v.play().catch(function () {}); };
    var sync = function () {
      if (!btn) return;
      var playing = !v.paused;
      if (label) label.textContent = playing ? 'Pause' : playText;
      if (playIcon) playIcon.hidden = playing;
      if (pauseIcon) pauseIcon.hidden = !playing;
    };
    var update = function () { if (ready && inView && auto && !userPaused) play(); else if (!inView && loaded) v.pause(); };
    v.addEventListener('play', sync); v.addEventListener('pause', sync);
    if (btn) btn.addEventListener('click', function () {
      if (v.paused) { userPaused = false; play(); } else { userPaused = true; v.pause(); }
    });
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (es) { inView = es[0].isIntersecting; update(); }, { threshold: 0.25 }).observe(v);
    }
    if (!ready) {
      var go = function () { whenIdle(function () { ready = true; update(); }); };
      if (document.readyState === 'complete') go(); else window.addEventListener('load', go);
    }
  });

  /* ---------- carousels (treatments, other treatments, Google reviews) ----------
     A scroll-snapping row: swipe or scroll natively, arrows move one screenful and wrap round,
     optional dots, and a gentle autoplay that stops for hover, focus, touch and reduced motion. */
  $$('[data-carousel]').forEach(function (track) {
    var box = track.closest('[data-carousel-box]') || track.parentElement;
    var items = Array.prototype.slice.call(track.children);
    var dotsBox = track.getAttribute('data-dots') && document.getElementById(track.getAttribute('data-dots'));
    var step = function () { return items.length > 1 ? items[1].offsetLeft - items[0].offsetLeft : track.clientWidth; };
    var perView = function () { return Math.max(1, Math.round(track.clientWidth / step())); };
    var atEnd = function () { return track.scrollLeft + track.clientWidth >= track.scrollWidth - 4; };
    function go(dir) {
      if (dir > 0 && atEnd()) return track.scrollTo({ left: 0, behavior: behavior });
      if (dir < 0 && track.scrollLeft <= 4) return track.scrollTo({ left: track.scrollWidth, behavior: behavior });
      track.scrollBy({ left: dir * step() * perView(), behavior: behavior });
    }
    var prev = $('[data-car-prev]', box), next = $('[data-car-next]', box);
    if (prev) prev.addEventListener('click', function () { go(-1); });
    if (next) next.addEventListener('click', function () { go(1); });
    track.addEventListener('keydown', function (e) {
      if (e.target !== track) return;
      if (e.key === 'ArrowRight') { e.preventDefault(); go(1); }
      if (e.key === 'ArrowLeft') { e.preventDefault(); go(-1); }
    });
    if (dotsBox) {
      var renderDots = function () {
        var pages = Math.max(1, Math.ceil(items.length / perView()));
        if (dotsBox.children.length !== pages) dotsBox.innerHTML = new Array(pages + 1).join('<span></span>');
        var page = atEnd() ? pages - 1 : Math.round(track.scrollLeft / (step() * perView()));
        Array.prototype.forEach.call(dotsBox.children, function (d, i) { d.classList.toggle('is-active', i === page); });
      };
      var raf;
      track.addEventListener('scroll', function () { cancelAnimationFrame(raf); raf = requestAnimationFrame(renderDots); }, { passive: true });
      window.addEventListener('resize', renderDots);
      renderDots();
    }
    var every = +track.getAttribute('data-autoplay');
    if (every && !reduceMotion && 'IntersectionObserver' in window) {
      var timer, visible = false, held = false;
      var tick = function () { clearInterval(timer); if (visible && !held) timer = setInterval(function () { go(1); }, every); };
      box.addEventListener('mouseenter', function () { held = true; tick(); });
      box.addEventListener('mouseleave', function () { held = false; tick(); });
      box.addEventListener('focusin', function () { held = true; tick(); });
      box.addEventListener('focusout', function () { held = false; tick(); });
      track.addEventListener('touchstart', function () { held = true; tick(); }, { passive: true });
      new IntersectionObserver(function (es) { visible = es[0].isIntersecting; tick(); }, { threshold: 0.4 }).observe(track);
    }
  });

  /* ---------- modals ---------- */
  var openModal = null;
  function setModal(m, open) {
    if (!m || m.classList.contains('is-open') === open) return;
    m.classList.toggle('is-open', open);
    m.setAttribute('aria-hidden', open ? 'false' : 'true');
    document.body.style.overflow = open ? 'hidden' : '';
    openModal = open ? m : null;
    if (open) { var f = $('input, .btn', m); if (f) setTimeout(function () { f.focus(); }, 50); }
  }
  $$('[data-modal-close]').forEach(function (el) { el.addEventListener('click', function () { setModal(el.closest('.modal'), false); }); });
  var bookModal = $('#bookModal'), enquiryModal = $('#enquiryModal'), qvModal = $('#qvModal');
  $$('[data-enquiry]').forEach(function (b) { b.addEventListener('click', function () { setModal(enquiryModal, true); }); });

  /* ---------- Mr Roy's full profile, in a dialog ---------- */
  var QV = JSON.parse(($('#qv-data') || {}).textContent || '{}');
  var qvBody = $('#qvBody');
  var h = function (s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); };
  function profile() {
    var r = QV.roy;
    qvBody.innerHTML = '<div class="qv-media"><img src="' + r.photo + '" alt="" style="object-position:44% center"></div>' +
      '<div class="qv-main"><span class="label">' + h(r.role) + '</span><h3 id="qv-title">' + h(r.name) + '</h3><p class="qv-lead">' + h(r.quals) + '</p>' +
      r.about.map(function (p) { return '<p>' + h(p) + '</p>'; }).join('') +
      '<div class="tags">' + r.focus.map(function (f) { return '<span class="tag">' + h(f) + '</span>'; }).join('') + '</div>' +
      '<div class="actions"><a class="btn btn-primary" href="#book" data-service="consultation">Book a consultation</a>' +
      '<a class="btn btn-outline" href="tel:' + QV.tel + '">' + QV.icons.phone + ' ' + h(QV.phone) + '</a></div></div>' +
      '<div class="qv-foot"><b>Career and training</b><ol class="timeline">' + r.timeline.map(function (x) { return '<li><span class="when">' + h(x[0]) + '</span><div><b>' + h(x[1]) + '</b><span>' + h(x[2]) + '</span></div></li>'; }).join('') + '</ol></div>';
    qvBody.parentElement.scrollTop = 0;
    setModal(qvModal, true);
  }
  document.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('[data-qv="roy"]');
    if (a && qvBody && QV.roy) { e.preventDefault(); profile(); }
  });
  // "Book a consultation" inside the profile closes it, then the link scrolls to the form
  if (qvModal) qvModal.addEventListener('click', function (e) {
    if (e.target.closest('a[href^="#"]')) setModal(qvModal, false);
  });

  /* ---------- consultation requests ---------- */
  var minDate = new Intl.DateTimeFormat('en-CA', { timeZone: TZ, year: 'numeric', month: '2-digit', day: '2-digit' }).format(new Date());
  var forms = $$('[data-book-form]');
  var optText = function (sel) { return sel.options[sel.selectedIndex].text; };
  function prefill(values) {
    forms.concat($('#quickBook') || [], $('#enquiryForm') || []).forEach(function (f) {
      var sel = f.elements.service;
      if (values.service && sel && $$('option', sel).some(function (o) { return o.value === values.service; })) sel.value = values.service;
      if (values.date && f.elements.date && values.date >= minDate) f.elements.date.value = values.date;
      if (values.slot && f.elements.slot && f.elements.slot.length) $$('input[name="slot"]', f).forEach(function (r) { r.checked = r.value === values.slot; });
    });
  }
  // "Book" links carry the treatment: data-service="lip-enhancement"
  document.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('[data-service]');
    if (a) prefill({ service: a.getAttribute('data-service') });
  }, true);

  var quick = $('#quickBook');
  if (quick) {
    quick.elements.date.min = minDate;
    quick.addEventListener('submit', function (e) {
      e.preventDefault();
      prefill({ service: quick.elements.service.value, date: quick.elements.date.value, slot: quick.elements.slot.value });
      $('#book').scrollIntoView({ behavior: behavior, block: 'start' });
      setTimeout(function () { var n = $('#book-name'); if (n) n.focus({ preventScroll: true }); }, reduceMotion ? 0 : 700);
    });
  }

  function validator(form, rules) {
    function check(name) {
      var field = form.querySelector('[data-field="' + name + '"]');
      var el = form.elements[name];
      var res = rules[name](el && el.value !== undefined ? el.value : '');
      if (field) {
        field.classList.toggle('has-error', res !== true);
        var er = field.querySelector('.err'); if (er && res !== true) er.textContent = res;
      }
      return res === true;
    }
    Object.keys(rules).forEach(function (nm) {
      var el = form.elements[nm];
      if (!el) return;
      (el.length && !el.tagName ? Array.prototype.slice.call(el) : [el]).forEach(function (x) { x.addEventListener('change', function () { check(nm); }); });
    });
    return function () {
      var ok = Object.keys(rules).map(check).every(Boolean);
      if (!ok) { var first = form.querySelector('.has-error input, .has-error select'); if (first) first.focus(); }
      return ok;
    };
  }
  var nameRule = function (v) { return v.trim().length >= 2 || 'Please tell us your name.'; };
  var phoneRule = function (v) { var d = v.replace(/[^\d]/g, ''); return (d.length >= 7 && d.length <= 15) || 'Please enter a phone number we can call.'; };

  function confirm(data) {
    $('#sumName').textContent = data.name;
    $('#sumService').textContent = data.service;
    $('#sumWhen').textContent = data.when;
    var body = 'Hello Excellence Medical,\n\nI would like to arrange a consultation.\n\nName: ' + data.name + '\nPhone: ' + data.phone +
      '\nTreatment: ' + data.service + '\nPreferred time: ' + data.when + (data.note ? '\n\n' + data.note : '');
    $('#mailSend').href = 'mailto:' + CLINIC_EMAIL + '?subject=' + encodeURIComponent('Consultation request: ' + data.service) + '&body=' + encodeURIComponent(body);
    setModal(bookModal, true);
  }

  forms.forEach(function (form) {
    form.elements.date.min = minDate;
    var valid = validator(form, {
      name: nameRule, phone: phoneRule,
      date: function (v) { return (!!v && v >= minDate) || 'Please pick today or a later date.'; },
      slot: function () { return !!form.querySelector('input[name="slot"]:checked') || 'Please choose a time of day.'; }
    });
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!valid()) return;
      var f = form.elements;
      var when = new Date(f.date.value + 'T00:00:00').toLocaleDateString('en-IE', { weekday: 'short', day: 'numeric', month: 'short' });
      confirm({ name: f.name.value.trim(), phone: f.phone.value.trim(), service: optText(f.service), when: when + ' · ' + form.querySelector('input[name="slot"]:checked').value, note: f.note.value.trim() });
      form.reset();
      f.date.min = minDate;
    });
  });

  var enquiry = $('#enquiryForm');
  if (enquiry) {
    var validEnquiry = validator(enquiry, { name: nameRule, phone: phoneRule });
    enquiry.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!validEnquiry()) return;
      var f = enquiry.elements;
      setModal(enquiryModal, false);
      confirm({ name: f.name.value.trim(), phone: f.phone.value.trim(), service: optText(f.service), when: 'Please call me back', note: f.note.value.trim() });
      enquiry.reset();
    });
  }

  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Escape') return;
    closeAll(); setDrawer(false); if (openModal) setModal(openModal, false);
  });

  /* ---------- map ----------
     Google's map is slow to start on phones, so it begins loading in the background shortly after the page
     is up (or at once if someone heads for it first), and is ready by the time it scrolls into view. */
  var mapFrame = $('.map iframe[data-src]');
  if (mapFrame) {
    var loadMap = function () { if (!mapFrame.getAttribute('src')) mapFrame.src = mapFrame.getAttribute('data-src'); };
    var soon = function () { setTimeout(function () { whenIdle(loadMap); }, 800); };
    if (document.readyState === 'complete') soon(); else window.addEventListener('load', soon);
    if ('IntersectionObserver' in window) new IntersectionObserver(function (es) { if (es[0].isIntersecting) loadMap(); }, { rootMargin: '1500px 0px' }).observe(mapFrame);
  }

  /* ---------- footer year ---------- */
  $$('[data-year]').forEach(function (el) { el.textContent = new Date().getFullYear(); });
})();
