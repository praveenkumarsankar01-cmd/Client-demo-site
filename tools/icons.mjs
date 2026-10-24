/* Line icons for treatment badges and the "Other treatments" carousel: 64×64, drawn with strokes in currentColor. */

const sparkle = (cx, cy, r) => `<path d="M${cx} ${cy - r}c${r * .18} ${r * .62} ${r * .2} ${r * .64} ${r} ${r}c-${r * .8} ${r * .36}-${r * .82} ${r * .38}-${r} ${r}c-${r * .18}-${r * .62}-${r * .2}-${r * .64}-${r}-${r}c${r * .8}-${r * .36} ${r * .82}-${r * .38} ${r}-${r}z"/>`;

export const icons = {
  // anti-wrinkle: a syringe, needle down to the left
  syringe: `<g transform="rotate(-45 32 32)"><path d="M3 32h9"/><path d="M12 29h4v6h-4z"/><rect x="16" y="25.5" width="26" height="13" rx="2.5"/><path d="M22 25.5v5M28 25.5v6.5M34 25.5v5"/><path d="M42 21v22"/><path d="M42 32h12"/><path d="M54 25v14"/></g>`,
  // medical: a head in profile with a headache bolt
  head: `<path d="M22 56v-8.5C15.5 44 12 37.6 12 30.5 12 19 21 10 32.5 10 43.4 10 52 18.2 52 28.6c0 1.5-.2 2.9-.6 4.3l4.1 7.1-4.5 1.4v6.1c0 2.6-2.1 4.5-4.6 4.5H40v4"/><path d="M33 18l-6 10h7l-5 10" stroke-linejoin="round"/>`,
  // dermal fillers: a droplet with a sparkle
  drop: `<path d="M30 8c8.5 10.5 17 20.6 17 30a17 17 0 0 1-34 0c0-9.4 8.5-19.5 17-30z"/><path d="M22.5 40a8 8 0 0 0 7.5 7.5"/>${sparkle(51, 13, 6)}`,
  // lip enhancement
  lips: `<path d="M5 32c6.5-2.6 10.6-11 17-11 4 0 6.8 3.2 10 3.2S38 21 42 21c6.4 0 10.5 8.4 17 11"/><path d="M5 32c6 0 9.6 2.4 13 6.4 3.4 3.8 8.4 6.6 14 6.6s10.6-2.8 14-6.6c3.4-4 7-6.4 13-6.4"/><path d="M12 32.4c7 1.6 13.4 2.4 20 2.4s13-.8 20-2.4"/>`,
  // Silhouette Soft: a face with lifting arrows either side
  lift: `<path d="M32 9c-8.6 0-14 7-14 16.4C18 37.6 25 54 32 54s14-16.4 14-28.6C46 16 40.6 9 32 9z"/><path d="M26.5 41c3.4 2.6 7.6 2.6 11 0"/><path d="M8 46V22M3 27l5-5 5 5"/><path d="M56 46V22M51 27l5-5 5 5"/>`,
  // PRP: a sample tube with a drop
  tube: `<path d="M20 9h18"/><path d="M23 9v39a6 6 0 0 0 12 0V9"/><path d="M23 30h12v18a6 6 0 0 1-12 0z" fill="currentColor" fill-opacity=".22"/><path d="M23 22h5M23 15h5"/><path d="M49 22c3.5 4.6 6 8.3 6 11a6 6 0 0 1-12 0c0-2.7 2.5-6.4 6-11z"/>`,
  // thinning hair
  hair: `<path d="M14 54c0-6 3-10 7-13v-9c0-10.5 5-19 15-19 9 0 14 7 14 16v12c4 3 6 7 6 13"/><path d="M21 32c4 0 9-3 12-8 3 4 8 7 17 7"/><path d="M27 18c-1 3-1 5 0 8M36 15c-1 3-1 6 0 9M44 18c0 3-.5 5-1.5 7"/>`,
  // minor surgery: a scalpel
  scalpel: `<g transform="rotate(-35 32 32)"><path d="M4 35c4-8.5 13-12.6 22-11.6V35z"/><rect x="26" y="29" width="34" height="8" rx="3"/><path d="M33 29v8M40 29v8"/></g>`,
  // mole check: a magnifier over a mark on the skin
  magnifier: `<circle cx="27" cy="27" r="16"/><path d="M39 39l15 15"/><circle cx="27" cy="27" r="5" fill="currentColor" fill-opacity=".28"/>`,
  // clinical skincare: layers of skin with a sparkle
  skin: `<path d="M6 26c6.5-4 13-4 19.5 0S39 30 45.5 26 52.5 22 58 26"/><path d="M6 38h52"/><path d="M6 50h52"/><path d="M18 26.5V50M32 29v21M46 26.5V50"/>${sparkle(50, 11, 6)}`,
  // men
  man: `<circle cx="32" cy="21" r="11"/><path d="M11 57c0-12 9.4-19 21-19s21 7 21 19"/><path d="M26 38.6L32 47l6-8.4"/>`,
  // consultation: a stethoscope
  consult: `<path d="M16 8v14a12 12 0 0 0 24 0V8"/><path d="M12 8h8M36 8h8"/><path d="M28 34v6a12 12 0 0 0 24 0v-8"/><circle cx="52" cy="27" r="5"/>`
};

export const iconSvg = name => `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${icons[name]}</svg>`;
