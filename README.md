# Origin Dental: client demo

Demo of the reworked Origin Dental website: a concept site for a fictional multispeciality dental clinic in Kodambakkam, Chennai, built by [Chennai Digital Team](https://www.chennaidigitalteam.com). The original version lives in the [origin-dentals](https://github.com/praveenkumarsankar01-cmd/origin-dentals) repo and is unchanged; this repo shows the new front page to clients.

Static HTML, CSS and JavaScript. Deploy the folder as-is (for example on Vercel); `tools/` is excluded from the deployment. Every page carries `noindex`, so search engines skip the demo.

## What changed from the original

- **Hero**: a visible headline, "Book an appointment" and "Ask on WhatsApp" buttons and a trust row (Google rating, years, specialists, languages) beside a consultation photo, instead of an untitled full-width video.
- **Quick booking bar** overlaps the hero and prefills the booking form.
- **Treatments**: four cards in a grid (no carousel), the other treatments as one row of links, and a stronger "In pain right now?" band.
- **Why families choose us**: one dark band with the clinic photo, Dr. Vikram's quote, four promises and the key figures. It replaces the separate intro, about and "other treatments" carousel sections.
- **Dentists**: the two managing directors beside four aligned portraits (no staggered layout).
- **Clinic tour**: the client's tour video moved below the fold, with a play button and the five pieces of equipment underneath.
- **Patient stories**: rating plus three quotes, instead of tabs and a separate reviews widget.
- **Prices in rupees** on every page (converted from the earlier dollar figures). International patients get estimates in rupees and US dollars.
- **Opening badge** says "Opens 8 AM today" rather than starting with "Closed".

The symptom finder, FAQ, booking form, map and all 22 treatment and 6 dentist pages work as before.

## Editing

All pages are generated from one content file:

```
tools/content.mjs     clinic details, services menu, 22 treatments, 6 dentists, Google-reviews placeholders
tools/icons.mjs       line icons for treatment cards and the "Other treatments" carousel
tools/build.mjs       page templates
```

After editing, rebuild with `node tools/build.mjs` (Node 18 or later, no packages needed) and commit the regenerated HTML.

## Structure

```
index.html                    home: hero, quick booking, treatments, why choose us, dentists,
                              symptom finder, clinic tour and equipment, patient stories, FAQ,
                              booking, map
services/index.html           all treatments, grouped as in the Services menu
services/*.html               22 treatment pages
doctors/*.html                6 dentist profiles
international-patients.html   planning treatment from abroad
assets/site.css               styles (logo blue + slate, Poppins)
assets/site.js                menus, open-now badge, tabs, videos, carousels, booking form
assets/img, media             photos, logo, posters and video
```

## Before showing it as a real clinic's site

- **Contact details**: the phone and WhatsApp number (+44 7700 900461, from Ofcom's range reserved for drama, so it never reaches a real line), the email (hello@origindentals.in, an unregistered domain) and the street address are fictional. Set the real ones in `clinic` in `tools/content.mjs`; the WhatsApp number used by the booking form is `WA_NUMBER` in `assets/site.js`.
- **Prices**: the rupee figures are conversions of the earlier placeholders. Replace them with the clinic's own fees in `tools/content.mjs`.
- **Google rating and reviews**: the 4.9 rating, patient stories and reviews band are placeholders (`reviews` in `tools/content.mjs`). Replace them with the clinic's own Google reviews.
- **Booking**: the form validates in the browser, shows a confirmation and offers to send the request on WhatsApp. It does not store bookings yet.

## Media

Photos from [Unsplash](https://unsplash.com/license) and [Pexels](https://www.pexels.com/license/), and the consultation clip (also the hero photo) from [Mixkit](https://mixkit.co/license/#videoFree), all free for commercial use. The clinic tour video and the managing directors' portraits were supplied by the client. The clinic, dentists, patient stories and reviews are fictional.
