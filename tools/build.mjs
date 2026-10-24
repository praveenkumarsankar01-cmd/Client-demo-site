/* ==========================================================================
   Excellence Medical — one-page demo generator
   Writes index.html (for hosting) and ../Excellence.html (the Desktop copy that opens in Chrome).
   The front page is self-contained: logo, clinic photos and the clinic tour video are embedded;
   treatment photos load from Pexels. Every treatment in the menus opens a short preview on the page.
   No dependencies:  node tools/build.mjs
   ========================================================================== */
import { readFileSync, writeFileSync, statSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { clinic as C, doctor as DR, categories as CAT, treatments as T, menuWomen, menuMen, menPopular, testimonials, tourYoutube, reviews, px } from './content.mjs';
import { iconSvg } from './icons.mjs';
import { SPRITE, VB } from './sprite.mjs';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const read = f => readFileSync(join(ROOT, f));
const data = (f, type) => `data:${type};base64,${read(f).toString('base64')}`;
const IMG = {
  logo: data('assets/img/logo.png', 'image/png'),
  icon64: data('assets/img/icon-64.png', 'image/png'),
  icon180: data('assets/img/icon-180.png', 'image/png'),
  poster: data('assets/media/tour-poster.webp', 'image/webp')
};
const S = Object.fromEntries(['exterior', 'reception', 'room-fireplace', 'rcs-certificate', 'roy-desk', 'lounge', 'room-window']
  .map(name => [name, data(`assets/img/clinic-${name}.webp`, 'image/webp')]));
const LOGO = { w: 368, h: 140 }; // logo.png

const MAP = `https://maps.google.com/maps?q=${encodeURIComponent(C.mapQuery)}&amp;z=15&amp;output=embed`;
const DIRECTIONS = `https://www.google.com/maps/dir/?api=1&amp;destination=${encodeURIComponent(C.mapQuery)}`;

const ic = (n, extra = '') => `<i class="ic ic-${n}${extra ? ' ' + extra : ''}" aria-hidden="true"><svg viewBox="${VB[n]}"><use href="#i-${n}"/></svg></i>`;
const stars = n => `<span class="stars" aria-label="${n} out of 5 stars">${ic('star').repeat(n)}</span>`;

/* ---------- links and small builders ----------
   Treatment links open the Treatments page (a second page in the same file) at that treatment or group. */
const tLink = k => `href="#/treatments/${k}"`;
const cLink = c => `href="#/treatments/${c}"`;
const bookFor = k => `href="#book" data-service="${k}"`;
const catOf = k => CAT[T[k].cat];
const priceOf = k => T[k].price || catOf(k).price || catOf(k).priceText;
const priceHtml = p => p.startsWith('From ') ? `From <b>${esc(p.slice(5))}</b>` : `<b>${esc(p)}</b>`;
const itemLink = item => {
  const [k, label] = Array.isArray(item) ? item : [item];
  if (k.startsWith('@')) return `<a ${cLink(k.slice(1))}>${esc(label)}</a>`;
  return `<a ${tLink(k)}>${esc(label || T[k].menu || T[k].title)}</a>`;
};
const photo = (id, w, alt, { pos = 'center' } = {}) =>
  `<img src="${px(id, w)}" alt="${esc(alt)}" loading="lazy" decoding="async" style="object-position:${pos}">`;
// lower-case a title for running text, keeping names and acronyms
const KEEP = /^(Silhouette|Soft|PRP|Mr|Roy|Crow’s|Crow's|Dublin)$/;
const lower = s => s.split(' ').map(w => KEEP.test(w) || /^[A-Z]{2,}/.test(w) || w.startsWith('(') ? w : w.toLowerCase()).join(' ');
const firstSentence = s => s.split('. ')[0].replace(/\.$/, '') + '.';
const catOrder = ['anti-wrinkle', 'dermal-fillers', 'silhouette-soft', 'prp', 'minor-surgery', 'medical', 'skincare'];
const inCat = c => Object.keys(T).filter(k => T[k].cat === c);

function serviceOptions(blank) {
  return `<option value="not-sure">${blank}</option><option value="consultation">Consultation with Mr Roy (${C.consultation})</option>` +
    catOrder.map(c => `<optgroup label="${esc(CAT[c].title)}">${inCat(c).map(k => `<option value="${k}">${esc(T[k].title)}</option>`).join('')}</optgroup>`).join('');
}

// social icons: placeholders for the demo (data-dummy links go nowhere); the real profiles are in content.mjs
const social = () => C.social.map(([k, label]) => `<a href="#" data-dummy aria-label="${label}">${ic(k)}</a>`).join('');

/* ---------- page frame ---------- */
function head(css) {
  return `<!doctype html>
<html lang="en-IE">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(`${C.name} | Aesthetic & Minor Surgery Clinic, Donnybrook, Dublin 4`)}</title>
<meta name="description" content="${esc(`${C.name}, ${C.area}. Anti-wrinkle treatments, dermal fillers, Silhouette Soft lifts, PRP and private minor surgery, all performed by Mr Shunil Roy, FRCS (Edinburgh). Call ${C.phone}.`)}">
<meta name="robots" content="noindex">
<meta name="theme-color" content="#17838a">
<link rel="icon" type="image/png" href="${IMG.icon64}">
<link rel="apple-touch-icon" href="${IMG.icon180}">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="preconnect" href="https://images.pexels.com">
<link rel="preload" href="https://fonts.gstatic.com/s/poppins/v24/pxiEyp8kv8JHgFVrJJfecg.woff2" as="font" type="font/woff2" crossorigin>
<style>
${css}
</style>
</head>
<body id="top">
<!-- Concept design for ${C.name} by Chennai Digital Team. Not the clinic's live website. -->
${SPRITE}
<a class="skip-link" href="#main">Skip to content</a>`;
}

// the treatment groups only, in columns, as on the clinic's current menu
function megaPanel(id, cols) {
  return `<div class="dd mega" id="${id}">
            <div class="mega-cols" style="--cols:${cols.length}">
              ${cols.map(col => `<div class="mega-col">${col.map(g => `<div class="mega-group"><a class="mega-head" ${cLink(g.cat)}><span class="mega-ico">${iconSvg(CAT[g.cat].icon)}</span>${esc(g.label)}</a><ul>${g.items.map(it => `<li>${itemLink(it)}</li>`).join('')}</ul></div>`).join('')}</div>`).join('\n              ')}
            </div>
            <div class="mega-foot">
              <a class="text-link" href="#/treatments">View all treatments ${ic('arrow-right')}</a>
              <span>Not sure which treatment is right for you? Start with a consultation (${C.consultation}).</span>
              <a class="btn btn-primary btn-sm" ${bookFor('consultation')}>Book a consultation</a>
            </div>
          </div>`;
}

function chrome() {
  const drawerGroups = menu => menu.flat().map(g => `<details class="sub"><summary>${esc(g.label)} ${ic('chevron-down', 'chev')}</summary><a ${cLink(g.cat)}><b>All ${esc(CAT[g.cat].short)}</b></a>${g.items.map(itemLink).join('')}</details>`).join('');
  return `
<div class="topbar">
  <div class="wrap">
    <ul class="topbar-list">
      <li><a href="tel:${C.tel}">${ic('phone')}${C.phone}</a></li>
      <li class="hide-md"><a href="mailto:${C.email}">${ic('envelope')}${C.email}</a></li>
      <li class="hide-lg"><a href="#find">${ic('location-dot')}${C.address}</a></li>
    </ul>
    <div class="topbar-right">
      <span class="open-badge" data-open-badge>Mon–Fri 10:30 AM – 4:30 PM</span>
      <span class="topbar-social">${social()}</span>
      <a class="topbar-cta" ${bookFor('consultation')}>Book consultation</a>
    </div>
  </div>
</div>
<header class="site-header">
  <div class="wrap nav">
    <a class="brand" href="#top"><img src="${IMG.logo}" alt="${C.name} — Dr. Shunil Roy M.B.B.S FRCS" width="${Math.round(LOGO.w * 58 / LOGO.h)}" height="58"></a>
    <nav class="main-nav" aria-label="Main">
      <ul class="nav-links">
        <li class="has-dd">
          <button type="button" class="nav-top" data-dropdown aria-expanded="false" aria-controls="dd-about">About ${ic('chevron-down', 'chev')}</button>
          <ul class="dd" id="dd-about">
            <li><a href="#about">About ${C.name}</a></li>
            <li><a href="#surgeon">About Mr Shunil Roy</a></li>
            <li><a href="#clinic">Why come to us</a></li>
            <li><a href="#stories">Video testimonials</a></li>
            <li><a href="#prices">Price guide</a></li>
          </ul>
        </li>
        <li class="has-dd has-mega">
          <button type="button" class="nav-top" data-dropdown aria-expanded="false" aria-controls="dd-treat">Select Treatment ${ic('chevron-down', 'chev')}</button>
          ${megaPanel('dd-treat', menuWomen)}
        </li>
        <li class="has-dd has-mega">
          <button type="button" class="nav-top" data-dropdown aria-expanded="false" aria-controls="dd-men">Men ${ic('chevron-down', 'chev')}</button>
          ${megaPanel('dd-men', menuMen)}
        </li>
        <li><a class="nav-top" href="#prices">Price guide</a></li>
        <li><a class="nav-top" href="#clinic">Clinic tour</a></li>
        <li class="has-dd dd-end">
          <button type="button" class="nav-top" data-dropdown aria-expanded="false" aria-controls="dd-contact">Contact ${ic('chevron-down', 'chev')}</button>
          <ul class="dd" id="dd-contact">
            <li><a href="#find">Contact &amp; directions</a></li>
            <li><a ${bookFor('consultation')}>Request a consultation</a></li>
            <li><a href="tel:${C.tel}">Call ${C.phone}</a></li>
            <li><a href="mailto:${C.email}">Email ${C.email}</a></li>
          </ul>
        </li>
      </ul>
    </nav>
    <button class="menu-toggle" type="button" aria-label="Open menu" aria-expanded="false" aria-controls="drawer">${ic('bars')}</button>
  </div>
</header>
<div class="drawer" id="drawer" aria-hidden="true">
  <div class="drawer-scrim" data-drawer-close></div>
  <div class="drawer-panel" role="dialog" aria-modal="true" aria-label="Menu">
    <div class="drawer-head">
      <img src="${IMG.logo}" alt="${C.name}" width="${Math.round(LOGO.w * 44 / LOGO.h)}" height="44">
      <button class="menu-toggle drawer-close" type="button" data-drawer-close aria-label="Close menu" style="display:grid">${ic('xmark')}</button>
    </div>
    <details><summary>About ${ic('chevron-down', 'chev')}</summary><a href="#about">About ${C.name}</a><a href="#surgeon">About Mr Shunil Roy</a><a href="#stories">Video testimonials</a><a href="#prices">Price guide</a></details>
    <details><summary>Select Treatment ${ic('chevron-down', 'chev')}</summary>${drawerGroups(menuWomen)}<a class="drawer-all" href="#/treatments">View all treatments</a></details>
    <details><summary>Men ${ic('chevron-down', 'chev')}</summary><a href="#/treatments/men"><b>Treatments for men</b></a>${drawerGroups(menuMen)}</details>
    <a class="drawer-link" href="#prices">Price guide</a>
    <a class="drawer-link" href="#clinic">Clinic tour</a>
    <a class="drawer-link" href="#find">Contact</a>
    <a class="btn btn-primary" ${bookFor('consultation')}>Book a consultation</a>
    <a class="btn btn-outline" href="tel:${C.tel}">${ic('phone')} ${C.phone}</a>
  </div>
</div>`;
}

function foot() {
  return `
<footer class="site-footer">
  <div class="wrap">
    <div class="footer-grid">
      <div class="footer-about">
        <a class="brand" href="#top"><img src="${IMG.logo}" alt="${C.name}" width="${Math.round(LOGO.w * 54 / LOGO.h)}" height="54" loading="lazy" decoding="async"></a>
        <p>${esc(C.tagline)}.</p>
        <span class="footer-social">${social()}</span>
      </div>
      <div><h4>Treatments</h4><ul>${catOrder.map(c => `<li><a ${cLink(c)}>${esc(CAT[c].title)}</a></li>`).join('')}<li><a href="#/treatments/men">Treatments for men</a></li><li><a href="#/treatments"><b>View all treatments</b></a></li></ul></div>
      <div><h4>The clinic</h4><ul><li><a href="#about">About ${C.name}</a></li><li><a href="#surgeon">About Mr Shunil Roy</a></li><li><a href="#clinic">Why come to us</a></li><li><a href="#stories">Video testimonials</a></li><li><a href="#prices">Price guide</a></li><li><a href="#clinic">Clinic tour</a></li></ul></div>
      <div><h4>Contact</h4><ul>
        <li>${C.address}</li>
        <li><a href="tel:${C.tel}">${C.phone}</a></li>
        <li><a href="mailto:${C.email}">${C.email}</a></li>
        <li>Monday – Friday 10:30 AM – 4:30 PM<br>Saturday &amp; Sunday closed</li>
        <li><a href="#find">Contact &amp; directions</a></li>
      </ul></div>
    </div>
    <div class="footer-bottom">
      <span>© <span data-year>2026</span> ${C.name}. ${esc(C.legal)}</span>
      <span>Concept website by <a href="https://www.chennaidigitalteam.com" target="_blank" rel="noopener">Chennai Digital Team</a></span>
    </div>
  </div>
</footer>
<button class="enquiry-float" type="button" data-enquiry>${ic('envelope')}<span>Quick enquiry</span></button>
<div class="mobile-bar">
  <a class="btn btn-outline" href="tel:${C.tel}">${ic('phone')} Call</a>
  <a class="btn btn-primary" ${bookFor('consultation')}>Book consultation</a>
</div>`;
}

/* ---------- sections ---------- */
function moreTreatments() {
  const items = [
    ['c', 'anti-wrinkle', 'syringe'], ['c', 'medical', 'head'], ['c', 'dermal-fillers', 'drop'], ['t', 'lip-enhancement', 'lips'],
    ['c', 'silhouette-soft', 'lift'], ['c', 'prp', 'tube'], ['t', 'hair-thinning', 'hair'], ['c', 'minor-surgery', 'scalpel'],
    ['t', 'mole-removal', 'magnifier'], ['c', 'skincare', 'skin'], ['men', '', 'man'], ['consult', '', 'consult']
  ].map(([kind, k, icon]) => {
    if (kind === 'c') return [cLink(k), CAT[k].title, CAT[k].card, icon];
    if (kind === 't') return [tLink(k), T[k].title, firstSentence(T[k].text), icon];
    if (kind === 'men') return ['href="#/treatments/men"', 'Treatments for Men', 'Anti-wrinkle, jawline, hair loss and sweating treatments for men.', icon];
    return [bookFor('consultation'), 'Consultation', `A ${C.consultation} consultation with Mr Roy, with an accurate written price.`, icon];
  });
  return `
<section class="more" aria-labelledby="mt-title" data-carousel-box>
  <div class="more-bg" aria-hidden="true" style="background-image:url(${px(6303609, 1920)})"></div>
  <div class="wrap">
    <div class="more-head">
      <h2 id="mt-title">Other treatments</h2>
      <div class="car-nav">
        <button class="car-btn" type="button" data-car-prev aria-label="Previous treatments">${ic('chevron-left')}</button>
        <button class="car-btn" type="button" data-car-next aria-label="Next treatments">${ic('chevron-right')}</button>
      </div>
    </div>
    <div class="car-track more-track" data-carousel data-autoplay="5000" tabindex="0" role="region" aria-label="Other treatments">
      ${items.map(([attrs, t, p, icon]) => `<a class="more-item" ${attrs}><span class="more-ico">${iconSvg(icon)}</span><h3>${esc(t)}</h3><p>${esc(p)}</p></a>`).join('\n      ')}
    </div>
  </div>
</section>`;
}

function reviewsBand() {
  return `
<section class="reviews" id="reviews" aria-labelledby="rv-title" data-carousel-box>
  <!-- SAMPLE reviews for the design preview — replace with the clinic's live Google reviews before launch (see tools/content.mjs) -->
  <div class="wrap reviews-inner">
    <h2 id="rv-title" class="sr-only">What patients say about ${C.name} on Google</h2>
    <div class="rv-summary">
      <img class="rv-logo" src="${IMG.icon180}" alt="" width="58" height="58">
      <div>
        <b class="rv-clinic">${C.name}</b>
        <div class="rv-score"><b>5.0</b>${stars(5)}</div>
        <span class="rv-count">Google reviews</span>
        <span class="rv-powered">powered by <span class="g-word"><span>G</span><span>o</span><span>o</span><span>g</span><span>l</span><span>e</span></span></span>
        <a class="rv-write" href="${reviews.writeUrl}" target="_blank" rel="noopener">review us on <svg viewBox="0 0 48 48" aria-hidden="true"><use href="#i-google"/></svg></a>
        <span class="rv-sample">Design preview: sample reviews. Your live Google reviews appear here.</span>
      </div>
    </div>
    <div class="rv-carousel">
      <button class="rv-arrow rv-prev" type="button" data-car-prev aria-label="Previous reviews">${ic('chevron-left')}</button>
      <div class="car-track rv-track" data-carousel data-dots="rv-dots" data-autoplay="6500" tabindex="0" role="region" aria-label="Google reviews">
        ${reviews.items.map(r => `<article class="rv-card">
          <header><span class="rv-av" style="background:${r.color}">${r.name[0]}</span><span class="rv-who"><b>${esc(r.name)}</b><span>${esc(r.when)}</span></span><svg class="rv-g" viewBox="0 0 48 48" aria-hidden="true"><use href="#i-google"/></svg></header>
          ${stars(5)}
          <p class="rv-text" tabindex="0">${esc(r.text)}</p>
        </article>`).join('\n        ')}
      </div>
      <button class="rv-arrow rv-next" type="button" data-car-next aria-label="Next reviews">${ic('chevron-right')}</button>
    </div>
    <div class="rv-dots" id="rv-dots" aria-hidden="true"></div>
  </div>
</section>`;
}

// contact details in a row, then the map edge to edge as a plain rectangle
function findUs() {
  return `
<section class="find" id="find" aria-labelledby="find-title">
  <div class="wrap">
    <div class="section-head">
      <span class="label">Location</span>
      <h2 id="find-title">Find us in Donnybrook</h2>
      <p>A private clinic on Morehampton Road, Dublin 4, a short journey from the city centre.</p>
    </div>
    <div class="loc-strip">
      <div><b>Address</b><span>${C.address}</span></div>
      <div><b>Reception</b><a href="tel:${C.tel}">${C.phone}</a><a href="mailto:${C.email}">${C.email}</a></div>
      <div><b>Opening hours</b><span class="open-badge" data-open-badge></span><span>Monday – Friday 10:30 AM – 4:30 PM<br>Saturday &amp; Sunday closed</span></div>
      <div class="loc-cta"><a class="btn btn-primary" href="${DIRECTIONS}" target="_blank" rel="noopener">${ic('location-dot')} Get directions</a></div>
    </div>
  </div>
  <div class="map">
    <iframe src="${MAP}" title="Map showing ${C.name}, ${C.address}" loading="lazy" referrerpolicy="no-referrer-when-downgrade" allowfullscreen></iframe>
  </div>
</section>`;
}

const faqList = items => `<div class="faq">
        ${items.map(([q, a]) => `<details><summary>${esc(q)} ${ic('plus')}</summary><p>${esc(a)}</p></details>`).join('\n        ')}
      </div>`;

function bookForm(prefix) {
  return `<form class="book-form" id="${prefix}Form" data-book-form novalidate>
        <div class="field" data-field="name"><label for="${prefix}-name">Full name</label><input id="${prefix}-name" name="name" autocomplete="name" required><span class="err" role="alert"></span></div>
        <div class="field" data-field="phone"><label for="${prefix}-phone">Phone number</label><input id="${prefix}-phone" name="phone" type="tel" autocomplete="tel" inputmode="tel" placeholder="087 123 4567" required><span class="err" role="alert"></span></div>
        <div class="field field--full"><label for="${prefix}-service">Treatment</label><select id="${prefix}-service" name="service">${serviceOptions('Not sure yet, please advise')}</select></div>
        <div class="field" data-field="date"><label for="${prefix}-date">Preferred date</label><input id="${prefix}-date" name="date" type="date" required><span class="err" role="alert"></span></div>
        <div class="field"><label for="${prefix}-email">Email <span class="opt">(optional)</span></label><input id="${prefix}-email" name="email" type="email" autocomplete="email"></div>
        <fieldset class="field field--full" data-field="slot">
          <legend>Preferred time</legend>
          <div class="slots">
            <input type="radio" name="slot" id="${prefix}-s-m" value="Morning"><label for="${prefix}-s-m">Morning<small>10:30 AM – 12:30 PM</small></label>
            <input type="radio" name="slot" id="${prefix}-s-a" value="Afternoon"><label for="${prefix}-s-a">Afternoon<small>12:30 – 4:30 PM</small></label>
          </div>
          <span class="err" role="alert"></span>
        </fieldset>
        <div class="field field--full"><label for="${prefix}-note">Message <span class="opt">(optional)</span></label><textarea id="${prefix}-note" name="note" placeholder="What would you like to improve, or any questions for Mr Roy"></textarea></div>
        <div class="form-foot">
          <p>We will call you to confirm. Your details are only used to arrange your consultation and are kept confidential.</p>
          <button class="btn btn-primary" type="submit">Request consultation</button>
        </div>
      </form>`;
}

/* ==========================================================================
   The front page
   ========================================================================== */
function home() {
  const cards = [
    ['c', 'anti-wrinkle'], ['c', 'dermal-fillers'], ['t', 'lip-enhancement'], ['c', 'silhouette-soft'],
    ['c', 'prp'], ['c', 'minor-surgery'], ['c', 'medical'], ['c', 'skincare']
  ];
  const card = ([kind, k]) => {
    const c = kind === 'c' ? CAT[k] : { ...CAT[T[k].cat], title: T[k].title, card: 'Subtle, natural-looking volume and definition for the lips.', photo: T[k].photo, pos: T[k].pos, price: T[k].price, icon: 'lips' };
    return `<a class="svc-card" ${kind === 'c' ? cLink(k) : tLink(k)}>
        <div class="svc-card-media">
          <div class="svc-card-img">${photo(c.photo, 600, '', { pos: c.pos })}</div>
          <span class="svc-card-badge">${iconSvg(c.icon)}</span>
        </div>
        <div class="svc-card-body">
          <h3>${esc(c.title)}</h3>
          <p>${esc(c.card)}</p>
          <div class="svc-card-foot"><span>${priceHtml(c.price || c.priceText)}</span><span class="text-link">Learn more ${ic('arrow-right')}</span></div>
        </div>
      </a>`;
  };
  const finder = [
    ['Frown lines & forehead lines', 7581589, 'center 30%', 'vertical-frown-lines', 'Anti-Wrinkle Treatment', 'Lines between the brows and across the forehead are caused by the muscles we use to frown and raise our eyebrows. Relaxing those muscles with a precise, low dose softens the lines within two weeks, while you keep natural expression.', [['Treatment time', '15–20 minutes'], ['Results', 'In 3–14 days'], ['Fee', 'From €250']]],
    ['Thin lips or lost volume', 34775253, 'center 40%', 'lip-enhancement', 'Lip Enhancement & Dermal Fillers', 'Hyaluronic acid filler restores volume to the lips and cheeks and softens deep folds. Mr Roy works with your natural proportions for a subtle result, with no overfilled look.', [['Treatment time', '30–45 minutes'], ['Results', 'Immediate'], ['Fee', 'From €400']]],
    ['Jowls & a sagging jawline', 7010952, 'center 30%', 'jawline-contouring', 'Silhouette Soft Lift', 'Dissolvable Silhouette Soft sutures lift the jowls and redefine the jawline straight away, then stimulate new collagen for up to 18 months. No incisions and no general anaesthetic.', [['Procedure time', '45–60 minutes'], ['Results', 'Immediate'], ['Fee', 'From €1,500']]],
    ['Thinning hair', 30809948, 'center 40%', 'hair-thinning', 'PRP for Hair Thinning', 'Growth factors from your own platelets, injected into the scalp, strengthen weak hair follicles and thicken thinning hair. A natural treatment for men and women.', [['Course', '3 sessions'], ['Results', 'In 3–6 months'], ['Fee', 'From €500']]],
    ['A mole, cyst or lump', 7446661, 'center 45%', 'mole-removal', 'Minor Surgery', 'Cysts, lipomas, moles and skin tags are removed under local anaesthetic by a Fellow of the Royal College of Surgeons. No GP referral and no HSE waiting list; same-day treatment is also available.', [['Procedure time', '20–45 minutes'], ['Anaesthetic', 'Local'], ['Fee', 'From €300']]],
    ['Excessive sweating', 16131210, 'center 40%', 'excessive-sweating', 'Medical Treatment for Sweating', 'Fine injections into the skin switch off overactive sweat glands in the underarms or forehead, keeping you dry for six to nine months.', [['Treatment time', '20–30 minutes'], ['Lasts', '6–9 months'], ['Fee', '€600–€800']]]
  ];
  const tv = testimonials;
  const vt = (t, big) => `<a class="vt${big ? ' vt--big' : ''}" href="https://www.youtube.com/watch?v=${t.id}" target="_blank" rel="noopener">
        <span class="vt-thumb"><img src="https://i.ytimg.com/vi/${t.id}/hqdefault.jpg" alt="" loading="lazy" decoding="async"><span class="vt-play">${ic('play')}</span></span>
        <span class="vt-body"><b>${esc(t.title)}</b><span>Patient testimonial · Watch on YouTube</span></span>
      </a>`;
  const still = (k, alt, cap) => `<figure><img src="${S[k]}" alt="${esc(alt)}" loading="lazy"><figcaption>${esc(cap)}</figcaption></figure>`;

  return `
<main id="main">
<div data-view="home">

<!-- top of the page, as on Origin Dental: the clinic tour edge to edge, with nothing over it -->
<section class="hero-video" id="tour" aria-label="Clinic tour">
  <video id="tourVideo" data-video data-after-load muted loop playsinline preload="none" poster="${IMG.poster}" aria-label="A walk through ${C.name}: the house on Morehampton Road, reception, treatment rooms and Mr Roy's consulting room"></video>
</section>

<section class="hero" aria-labelledby="hero-title">
  <div class="wrap hero-grid">
    <div>
      <span class="hero-label">${C.name} · ${C.area}</span>
      <h1 id="hero-title">Natural-looking results, in a surgeon's hands</h1>
    </div>
    <div>
      <p class="hero-lead">Anti-wrinkle treatments, dermal fillers, Silhouette Soft lifts, PRP and private minor surgery. Every treatment is performed personally by ${DR.name}, FRCS (Edinburgh).</p>
      <div class="actions">
        <a class="btn btn-primary" ${bookFor('consultation')}>Book a consultation</a>
        <a class="btn btn-ghost" href="#treatments">Explore treatments ${ic('arrow-right')}</a>
      </div>
    </div>
  </div>
  <div class="hero-strip">
    <div class="wrap">
      <span><b>FRCS (Edinburgh)</b>Surgical fellowship, 1997</span>
      <span><b>20+ years</b>in aesthetic medicine</span>
      <span><b>Silhouette Soft</b>Pioneered in Ireland, 2012</span>
      <span><b>No waiting list</b>for minor surgery</span>
      <button class="video-btn" type="button" data-controls="tourVideo">${ic('play')}${ic('pause').replace('aria-hidden="true"', 'aria-hidden="true" hidden')}<span data-label>Play the clinic tour</span></button>
    </div>
  </div>
</section>

<section class="leaders" aria-labelledby="ld-title">
  <div class="wrap leaders-grid">
    <div class="leaders-copy">
      <h2 id="ld-title" class="sr-only">Our medical director and our clinic</h2>
      <p>${C.name} in ${C.area} is ${esc(C.tagline.replace("Ireland's", 'Ireland’s'))}. Every consultation, treatment and procedure is carried out personally by our medical director, the surgeon ${DR.name}.</p>
      <div class="years">
        <svg class="years-ico" viewBox="0 0 96 80" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M14 6C2 24 2 56 14 74M82 6c12 18 12 50 0 68"/><path d="M33 20l30 40M63 20L52 34M44 46L33 60" stroke-width="3.4"/><path d="M68 12L28 68" stroke-width="1.6"/></svg>
        <div><b>20+ years</b><span>of aesthetic medicine with Mr Roy</span></div>
      </div>
    </div>
    <div class="leaders-docs">
      <a class="leader" href="#surgeon">
        <span class="leader-photo"><img src="${DR.photo}" alt="Portrait of ${DR.name}" style="object-position:66% 10%" decoding="async"></span>
        <h3>${DR.name}</h3>
        <span class="leader-quals">M.B.B.S · FRCS (Edinburgh)<br>Medical Director</span>
      </a>
      <a class="leader" href="#clinic">
        <span class="leader-photo"><img src="${S.exterior}" alt="The clinic's red-brick house on Morehampton Road" style="object-position:30% center" decoding="async"></span>
        <h3>Our clinic</h3>
        <span class="leader-quals">12 Morehampton Road<br>Donnybrook, Dublin 4</span>
      </a>
    </div>
  </div>
</section>

<div class="wrap qb-wrap">
  <form class="quick-book" id="quickBook" aria-label="Start a booking">
    <div class="qb-field"><label for="qb-service">Treatment</label><select id="qb-service" name="service">${serviceOptions('Not sure yet')}</select></div>
    <div class="qb-field"><label for="qb-date">Preferred date</label><input id="qb-date" name="date" type="date"></div>
    <div class="qb-field"><label for="qb-slot">Time of day</label><select id="qb-slot" name="slot"><option value="">Any time</option><option>Morning</option><option>Afternoon</option></select></div>
    <button class="btn btn-primary" type="submit">Continue booking ${ic('arrow-right')}</button>
  </form>
</div>

<section class="intro" aria-label="${C.name} in brief">
  <div class="wrap">
    <p class="statement">One surgeon. Every treatment. <span>Mr Roy examines you, explains your options honestly and performs every procedure himself, under local anaesthetic and with little or no downtime.</span></p>
    <dl class="figures">
      <div><dt>Surgical fellowship (FRCS) awarded</dt><dd>1997</dd></div>
      <div><dt>Years in aesthetic medicine</dt><dd>20+</dd></div>
      <div><dt>Treatments and procedures</dt><dd>${Object.keys(T).length}</dd></div>
      <div><dt>Silhouette Soft first in Ireland</dt><dd>2012</dd></div>
    </dl>
  </div>
</section>

<section class="section section--soft" id="treatments" aria-labelledby="tr-title" data-carousel-box>
  <div class="wrap">
    <div class="head-split">
      <div><span class="label">Treatments</span><h2 id="tr-title">Non-surgical, minimally invasive and minor surgical treatments</h2></div>
      <div><p>From a single anti-wrinkle area to a Silhouette Soft lift, each treatment is planned around your face and priced in writing after your consultation.</p><div class="svc-nav"><a class="text-link" href="#/treatments">View all treatments ${ic('arrow-right')}</a><span class="car-nav"><button class="car-btn car-btn--light" type="button" data-car-prev aria-label="Previous treatments">${ic('chevron-left')}</button><button class="car-btn car-btn--light" type="button" data-car-next aria-label="Next treatments">${ic('chevron-right')}</button></span></div></div>
    </div>
    <div class="car-track svc-cards" data-carousel tabindex="0" role="region" aria-label="Treatments">
      ${cards.map(card).join('\n      ')}
    </div>
    <div class="urgent">
      <div><h3>A lump, cyst or mole that worries you?</h3><p>Private minor surgery in Dublin with no HSE waiting list and no referral needed. Same-day treatment is also available.</p></div>
      <div class="actions">
        <a class="btn btn-primary" href="tel:${C.tel}">${ic('phone')} Call ${C.phone}</a>
        <a class="btn btn-outline" ${cLink('minor-surgery')}>Minor surgery</a>
      </div>
    </div>
  </div>
</section>

<section class="section" id="finder" aria-labelledby="fd-title">
  <div class="wrap finder" data-tabs>
    <div class="finder-side">
      <span class="label">Not sure what you need?</span>
      <h2 id="fd-title">Start with what you would like to change</h2>
      <p>Choose the concern closest to yours. At your consultation Mr Roy will examine you and advise honestly, including when a treatment will not help.</p>
    </div>
    <div class="finder-tabs" role="tablist" aria-label="Common concerns" aria-orientation="vertical">
      ${finder.map(([t, img, pos], i) => `<button type="button" role="tab" id="ft-${i}" aria-controls="fp-${i}" aria-selected="${i === 0}"${i ? ' tabindex="-1"' : ''}><span>${t}</span><span class="ft-pic"><img src="${px(img, 200)}" alt="" loading="lazy" decoding="async" style="object-position:${pos}"></span></button>`).join('\n      ')}
    </div>
    <div class="finder-panels">
      ${finder.map(([, , , k, h, text, facts], i) => `<div class="finder-panel" role="tabpanel" id="fp-${i}" aria-labelledby="ft-${i}" tabindex="0">
        <span class="label">Likely treatment</span>
        <h3>${esc(h)}</h3>
        <p>${esc(text)}</p>
        <dl class="facts">${facts.map(([a, b]) => `<div><dt>${a}</dt><dd>${b}</dd></div>`).join('')}</dl>
        <div class="finder-doc"><img src="${DR.photo}" alt="" loading="lazy" decoding="async"><span><b>${DR.name}</b>Performs every treatment personally</span></div>
        <div class="actions">
          <a class="btn btn-primary" ${bookFor(k)}>Book a consultation</a>
          <a class="btn btn-outline" ${tLink(k)}>About ${esc(lower(T[k].title))}</a>
        </div>
      </div>`).join('\n      ')}
    </div>
  </div>
</section>

<section class="section" id="about" aria-labelledby="ab-title">
  <div class="wrap">
    <div class="about-photo">${photo(29648624, 1800, 'A patient relaxing during a facial treatment', { pos: 'center 72%' })}</div>
    <div class="about-body">
      <div class="about-card">
        <span class="label">Our commitment</span>
        <h2 id="ab-title">A private clinic, with a surgeon's standards</h2>
        <p>Our first commitment is an honest, trusting relationship with every patient. With over 20 years of experience, Mr Roy brings a surgeon's training and a genuine passion for the highest standard of care, and every treatment plan is tailored to you.</p>
        <figure class="pull">
          <blockquote>“Our primary commitment is to foster an honest, trusting relationship with each and every patient.”</blockquote>
          <figcaption><img src="${S['roy-desk']}" alt="" width="46" height="46" style="object-position:40% center"><span><b>${C.name}</b>Our commitment to you</span></figcaption>
        </figure>
      </div>
      <div class="about-side">
        <ul class="ticks">
          <li>${ic('check')}<span>Every treatment performed by a Fellow of the Royal College of Surgeons of Edinburgh</span></li>
          <li>${ic('check')}<span>Procedures under local anaesthetic, never a general anaesthetic</span></li>
          <li>${ic('check')}<span>A discreet, confidential clinic in a period house in Donnybrook</span></li>
          <li>${ic('check')}<span>An accurate written price after your consultation</span></li>
        </ul>
        <a class="text-link" href="#clinic">See inside the clinic ${ic('arrow-right')}</a>
      </div>
    </div>
  </div>
</section>

<section class="section section--flush" id="clinic" aria-labelledby="cl-title">
  <div class="wrap">
    <div class="panel tech">
      <div class="tech-media">
        <div class="video-wrap">
          <video data-video muted loop playsinline preload="none" poster="${IMG.poster}" aria-label="Clinic tour: the house, reception, treatment rooms and Mr Roy's consulting room"></video>
          <button class="video-btn" type="button">${ic('play')}${ic('pause').replace('aria-hidden="true"', 'aria-hidden="true" hidden')}<span data-label>Play the clinic tour</span></button>
        </div>
        <div class="tech-stills">
          ${still('reception', 'Reception', 'Reception')}
          ${still('room-fireplace', 'A treatment room with a period fireplace', 'Treatment room')}
          ${still('rcs-certificate', "Mr Roy's Fellowship certificate from the Royal College of Surgeons of Edinburgh", 'FRCS (Edinburgh)')}
          ${still('lounge', 'The consultation lounge', 'Consultation lounge')}
          ${still('room-window', 'The procedure room', 'Procedure room')}
          ${still('roy-desk', 'Mr Roy at his desk', "Mr Roy's consulting room")}
        </div>
      </div>
      <div class="tech-copy">
        <span class="label">Inside the clinic</span>
        <h2 id="cl-title">Why patients choose ${C.name}</h2>
        <p>A calm, private house on Morehampton Road, and one surgeon who knows your face and your history.</p>
        <ol class="tech-list">
          <li><span class="num">01</span><div><h3>A surgeon for every treatment</h3><p>Mr Roy personally performs every treatment and procedure. You will never be handed over to a junior practitioner.</p></div></li>
          <li><span class="num">02</span><div><h3>Natural-looking results</h3><p>Each treatment is carried out with care and precision, to enhance your features subtly rather than change them.</p></div></li>
          <li><span class="num">03</span><div><h3>Little or no downtime</h3><p>Minimally invasive techniques under local anaesthetic, so most people return to their day straight away.</p></div></li>
          <li><span class="num">04</span><div><h3>Tailored to you</h3><p>Plans are built around your goals and your anatomy, with honest advice about what will and will not help.</p></div></li>
          <li><span class="num">05</span><div><h3>Discreet and confidential</h3><p>Many of Mr Roy's patients are public figures. Your visit and your records stay private.</p></div></li>
        </ol>
      </div>
    </div>
  </div>
</section>
${moreTreatments()}

<section class="section" id="surgeon" aria-labelledby="sg-title">
  <div class="wrap split split--top surgeon">
    <div class="surgeon-photo"><img src="${DR.photo}" alt="${esc(DR.photoAlt)}" loading="lazy" decoding="async"></div>
    <div>
      <span class="label">Your surgeon</span>
      <h2 id="sg-title">${DR.name}</h2>
      <span class="surgeon-quals">${DR.quals} · ${DR.role}</span>
      <p class="surgeon-lead">${esc(DR.lead)}</p>
      <ol class="timeline timeline--compact">
        ${DR.timeline.slice(0, 5).map(([w, b, s]) => `<li><span class="when">${w}</span><div><b>${esc(b)}</b><span>${esc(s)}</span></div></li>`).join('\n        ')}
      </ol>
      <div class="actions" style="margin-top:26px">
        <a class="btn btn-primary" href="#surgeon" data-qv="roy">Read Mr Roy's full profile</a>
        <a class="btn btn-outline" href="https://www.youtube.com/watch?v=${tourYoutube}" target="_blank" rel="noopener">${ic('play')} Clinic tour on YouTube</a>
      </div>
    </div>
  </div>
</section>

<section class="section section--soft" id="stories" aria-labelledby="st-title">
  <div class="wrap">
    <div class="head-split">
      <div><span class="label">Patient stories</span><h2 id="st-title">Video testimonials from our patients</h2></div>
      <div><p>Real patients of ${C.name} talking about their treatment with Mr Roy, from the clinic's YouTube channel.</p></div>
    </div>
    <div class="vt-grid">
      ${vt(tv[0], true)}
      ${tv.slice(1).map(t => vt(t)).join('\n      ')}
    </div>
  </div>
</section>

<section class="section" id="prices" aria-labelledby="pr-title">
  <div class="wrap">
    <div class="head-split">
      <div><span class="label">Price guide</span><h2 id="pr-title">Clear prices, confirmed at your consultation</h2></div>
      <div><p>We treat each patient individually and give you an accurate price after your consultation with Mr Roy. As a guide, our prices are:</p></div>
    </div>
    <div class="price-grid">
      <div class="price-card price-card--feature"><span class="label">Start here</span><h3>Consultation</h3><b class="price-big">${C.consultation}</b><p>With Mr Roy, including an examination, an honest discussion of your options and an accurate price.</p><a class="btn btn-primary" ${bookFor('consultation')}>Book a consultation</a></div>
      ${catOrder.map(c => `<a class="price-card" ${cLink(c)}><span class="price-ico">${iconSvg(CAT[c].icon)}</span><h3>${esc(CAT[c].title)}</h3><table class="price-table"><tbody>${CAT[c].prices.map(([x, y]) => `<tr><th scope="row">${esc(x)}</th><td>${esc(y)}</td></tr>`).join('')}</tbody></table><span class="text-link">About ${esc(lower(CAT[c].short))} ${ic('arrow-right')}</span></a>`).join('\n      ')}
    </div>
  </div>
</section>

<section class="section section--soft" id="faq" aria-labelledby="hq-title">
  <div class="wrap faq-layout">
    <div class="faq-side">
      <span class="label">Questions</span>
      <h2 id="hq-title">Before your consultation</h2>
      <p>Answers to what patients most often ask us. For anything else, call or send us a quick enquiry.</p>
      <button class="btn btn-outline" type="button" data-enquiry>${ic('envelope')} Send a quick enquiry</button>
    </div>
    ${faqList([
      ['How much is a consultation?', `A consultation with Mr Roy costs ${C.consultation}. He examines you, explains your options and gives you an accurate price for your treatment.`],
      ['Who will carry out my treatment?', 'Mr Roy personally performs every treatment and procedure at Excellence Medical, from a single anti-wrinkle area to minor surgery.'],
      ['Does it hurt?', 'Most treatments use very fine needles, with numbing cream or local anaesthetic where needed. Procedures are done under local anaesthetic, so you stay awake and comfortable.'],
      ['Is there any downtime?', 'Most non-surgical treatments need little or none. Silhouette Soft and minor surgery may mean a day or two of mild swelling, and you go home the same day.'],
      ['Will the result look natural?', 'That is the aim of every treatment. Mr Roy uses conservative doses and works with your natural features, and reviews you afterwards to fine-tune if needed.'],
      ['Do I need a referral for minor surgery?', 'No. You can book directly, there is no HSE waiting list, and same-day treatment is also available.']
    ])}
  </div>
</section>

<section class="section" id="book" aria-labelledby="bk-title">
  <div class="wrap">
    <div class="book-card">
      <div class="book-aside">
        <span class="label">Consultations</span>
        <h2 id="bk-title">Request a consultation</h2>
        <p>Send us your details and our reception team will call you to arrange a time. Your consultation with Mr Roy is ${C.consultation}, and you will leave with an accurate price for your treatment.</p>
        <ul class="contact-list">
          <li>${ic('phone')}<span><a href="tel:${C.tel}">${C.phone}</a><small>Reception</small></span></li>
          <li>${ic('envelope')}<span><a href="mailto:${C.email}">${C.email}</a><small>We reply within one working day</small></span></li>
          <li>${ic('clock')}<span><span class="open-badge" data-open-badge>Mon–Fri 10:30 AM – 4:30 PM</span><small>Saturday &amp; Sunday closed</small></span></li>
        </ul>
      </div>
      ${bookForm('book')}
    </div>
  </div>
</section>
${reviewsBand()}
${findUs()}

</div>
${treatmentsPage()}
</main>`;
}

/* ==========================================================================
   The Treatments page: every "Learn more" and menu link opens this one page at its treatment
   ========================================================================== */
function treatmentsPage() {
  const intro = ({ id, label, title, lead, about = [], facts, suitable, prices, photoHtml, icon, service }) => `
    <div class="tp-intro">
      <div class="tp-photo">${photoHtml}<span class="svc-card-badge">${iconSvg(icon)}</span></div>
      <div class="tp-copy">
        <span class="label">${esc(label)}</span>
        <h2 id="${id}-title">${esc(title)}</h2>
        <p class="tp-lead">${esc(lead)}</p>
        ${about.map(p => `<p>${esc(p)}</p>`).join('\n        ')}
        <dl class="facts">${facts.map(([a, b]) => `<div><dt>${esc(a)}</dt><dd>${esc(b)}</dd></div>`).join('')}</dl>
        ${suitable ? `<div class="tp-cols">
          <div><b class="qv-sub">This may suit you if you have</b><ul class="ticks">${suitable.map(x => `<li>${ic('check')}<span>${esc(x)}</span></li>`).join('')}</ul></div>
          <div><b class="qv-sub">Price guide</b><table class="price-table"><tbody>${prices.map(([x, y]) => `<tr><th scope="row">${esc(x)}</th><td>${esc(y)}</td></tr>`).join('')}</tbody></table></div>
        </div>` : ''}
        <div class="actions">
          <a class="btn btn-primary" ${bookFor(service)}>Book a consultation</a>
          <a class="btn btn-outline" href="tel:${C.tel}">${ic('phone')} ${C.phone}</a>
        </div>
      </div>
    </div>`;
  const card = k => `<article class="tp-card" id="tr-${k}">
          <h4>${esc(T[k].title)}</h4>
          <p>${esc(T[k].text)}</p>
          <div class="tp-card-foot"><span>${priceHtml(priceOf(k))}</span><a class="text-link" ${bookFor(k)}>Book ${ic('arrow-right')}</a></div>
        </article>`;
  const category = (c, i) => {
    const k = CAT[c], items = inCat(c);
    return `
<section class="section tp-cat${i % 2 ? ' section--soft' : ''}" id="tr-${c}" aria-labelledby="tr-${c}-title">
  <div class="wrap">${intro({ id: `tr-${c}`, label: k.short, title: k.title, lead: k.lead, about: k.about, facts: k.facts, suitable: k.suitable, prices: k.prices, photoHtml: photo(k.photo, 900, k.title, { pos: k.pos }), icon: k.icon, service: items[0] })}
    <div class="tp-areas-head"><h3>Areas we treat</h3><span>${items.length} treatments</span></div>
    <div class="tp-grid">
        ${items.map(card).join('\n        ')}
    </div>
    <div class="tp-more">
      <div><h3>How treatment works</h3><ol class="steps">${k.steps.map(([x, y]) => `<li><h4>${esc(x)}</h4><p>${esc(y)}</p></li>`).join('')}</ol></div>
      <div><h3>Questions</h3>${faqList(k.faq)}</div>
    </div>
  </div>
</section>`;
  };
  const men = `
<section class="section tp-cat${catOrder.length % 2 ? ' section--soft' : ''}" id="tr-men" aria-labelledby="tr-men-title">
  <div class="wrap">${intro({ id: 'tr-men', label: 'Men', title: 'Treatments for men', lead: 'More men than ever come to us for discreet treatments: softening frown lines, defining the jaw, treating hair loss and excessive sweating, and removing moles and cysts. Plans are built around a masculine face, so results look like you on a good day.', facts: [['Consultation', C.consultation], ['Downtime', 'Little or none'], ['Practitioner', 'Mr Roy, every visit']], photoHtml: photo(38167607, 900, 'A man receiving an anti-wrinkle treatment', { pos: 'center 30%' }), icon: 'man', service: 'consultation' })}
    <div class="tp-areas-head"><h3>Popular with men</h3><span>${menPopular.length} treatments</span></div>
    <div class="tp-grid">
        ${menPopular.map(k => `<a class="tp-card tp-card--link" ${tLink(k)}><h4>${esc(T[k].title)}</h4><p>${esc(firstSentence(T[k].text))}</p><div class="tp-card-foot"><span>${priceHtml(priceOf(k))}</span><span class="text-link">Read more ${ic('arrow-right')}</span></div></a>`).join('\n        ')}
    </div>
  </div>
</section>`;
  return `
<div data-view="treatments" hidden>
<section class="tp-head" aria-labelledby="tp-title">
  <div class="wrap">
    <nav class="crumbs" aria-label="Breadcrumb"><a href="#/">Home</a>${ic('chevron-right')}<span>Treatments</span></nav>
    <span class="label">Treatments</span>
    <h1 id="tp-title">All treatments</h1>
    <p class="lead">${Object.keys(T).length} treatments and procedures in seven groups, from a single anti-wrinkle area to a Silhouette Soft lift. Every one is performed by Mr Roy and priced in writing after your consultation.</p>
    <a class="text-link tp-back" href="#/">${ic('chevron-left')} Back to the home page</a>
  </div>
</section>
<nav class="tp-jump" aria-label="Treatment groups"><div class="wrap">${catOrder.map(c => `<a ${cLink(c)}>${esc(CAT[c].short)}</a>`).join('')}<a href="#/treatments/men">Men</a></div></nav>
${catOrder.map(category).join('')}
${men}
<section class="section" aria-label="Book a consultation">
  <div class="wrap">
    <div class="tp-cta">
      <div><h2>Not sure which treatment you need?</h2><p>Book a consultation and Mr Roy will examine you, explain your options and give you an accurate price. Consultations are ${C.consultation}.</p></div>
      <div class="actions"><a class="btn btn-primary" ${bookFor('consultation')}>Book a consultation</a><a class="btn btn-outline" href="tel:${C.tel}">${ic('phone')} ${C.phone}</a></div>
    </div>
  </div>
</section>
</div>`;
}

/* ---------- Mr Roy's profile, shown in a dialog ---------- */
const QV = {
  icons: { phone: ic('phone') },
  phone: C.phone, tel: C.tel,
  roy: { name: DR.name, quals: DR.quals, role: DR.role, photo: DR.photo, about: DR.about, timeline: DR.timeline, focus: DR.focus }
};

const modals = `
<div class="modal qv" id="qvModal" aria-hidden="true">
  <div class="modal-scrim" data-modal-close></div>
  <div class="modal-card qv-card" role="dialog" aria-modal="true" aria-labelledby="qv-title">
    <button class="modal-x" type="button" data-modal-close aria-label="Close">${ic('xmark')}</button>
    <div class="qv-body" id="qvBody"></div>
  </div>
</div>
<div class="modal" id="bookModal" aria-hidden="true">
  <div class="modal-scrim" data-modal-close></div>
  <div class="modal-card" role="dialog" aria-modal="true" aria-labelledby="m-title">
    <h3 id="m-title">Thank you, we have your request</h3>
    <p>Our reception team will call you to arrange your consultation.</p>
    <div class="summary">
      <div><b>Name:</b> <span id="sumName"></span></div>
      <div><b>Treatment:</b> <span id="sumService"></span></div>
      <div><b>Preferred time:</b> <span id="sumWhen"></span></div>
    </div>
    <div class="modal-actions">
      <a class="btn btn-primary" id="mailSend" href="mailto:${C.email}">${ic('envelope')} Also send by email</a>
      <button class="btn btn-outline" type="button" data-modal-close>Close</button>
    </div>
  </div>
</div>
<div class="modal" id="enquiryModal" aria-hidden="true">
  <div class="modal-scrim" data-modal-close></div>
  <div class="modal-card modal-card--form" role="dialog" aria-modal="true" aria-labelledby="q-title">
    <button class="modal-x" type="button" data-modal-close aria-label="Close">${ic('xmark')}</button>
    <h3 id="q-title">Quick enquiry</h3>
    <p>Leave your details and we will call you back.</p>
    <form class="enquiry-form" id="enquiryForm" novalidate>
      <div class="field" data-field="name"><label for="q-name">Name</label><input id="q-name" name="name" autocomplete="name" required><span class="err" role="alert"></span></div>
      <div class="field" data-field="phone"><label for="q-phone">Phone</label><input id="q-phone" name="phone" type="tel" autocomplete="tel" required><span class="err" role="alert"></span></div>
      <div class="field"><label for="q-service">Treatment</label><select id="q-service" name="service">${serviceOptions('Not sure yet')}</select></div>
      <div class="field"><label for="q-note">Your question <span class="opt">(optional)</span></label><textarea id="q-note" name="note" rows="3"></textarea></div>
      <button class="btn btn-primary" type="submit">Send enquiry</button>
    </form>
  </div>
</div>`;

/* ---------- write the single file ---------- */
const css = read('assets/site.css').toString();
const js = read('assets/site.js').toString();
const video = read('assets/media/tour.mp4').toString('base64');
// index.html (hosted) streams the video from assets/media; the Desktop copy carries it inside, so it works on its own
const page = embed => (head(css) + chrome() + home() + modals + foot())
  .replace('id="tourVideo" data-video', `id="tourVideo" data-src="assets/media/tour.mp4" data-video`)
  .replace(/<video data-video muted/g, '<video data-src="assets/media/tour.mp4" data-video muted') + `
<script type="application/json" id="qv-data">${JSON.stringify(QV).replace(/</g, '\\u003c')}</script>${embed ? `
<script type="application/octet-stream" id="tour-data">${video}</script>` : ''}
<script>
${js}
</script>
</body>
</html>
`;
const outs = [[join(ROOT, 'index.html'), false], [join(ROOT, '..', 'Excellence.html'), true]];
for (const [f, embed] of outs) {
  writeFileSync(f, page(embed));
  console.log(`built ${f} (${(statSync(f).size / 1048576).toFixed(2)} MB${embed ? ', video inside' : ', video from assets/media'})`);
}
