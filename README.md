# Excellence Medical: front-page demo

Concept front page for [Excellence Medical](https://excellencemedical.ie/), Donnybrook, Dublin 4, by [Chennai Digital Team](https://www.chennaidigitalteam.com). The layout follows our Origin Dental site, in Excellence Medical's colours, with the clinic's own logo, tour video and details.

`index.html` is the whole site in one file. Open it in a browser, or host the folder as-is (for example on Vercel or GitHub Pages). `tools/` and the source assets are only needed to rebuild it.

## What's on the page

Clinic tour video, medical director band, quick booking bar, treatment cards, "what would you like to change" finder, every treatment by category (women and men, as on the clinic's current menu), about, inside the clinic (video and stills), other treatments, Mr Roy, video testimonials, price guide, FAQ, consultation form, Google reviews band and map.

The "Select Treatment" and "Men" mega menus list every treatment from the clinic's current site. Each one opens a short preview with its description, price and a booking button, so the demo works as a single page.

## Editing

```
tools/content.mjs    clinic details, prices, Mr Roy, 7 categories, 60 treatments, menus, testimonials
tools/build.mjs      page template
tools/icons.mjs      line icons
assets/site.css      styles
assets/site.js       menus, previews, video, carousels, forms
```

Rebuild with `node tools/build.mjs` (Node 18 or later, no packages). It writes `index.html` here and `Excellence.html` on the Desktop.

## Before showing it as the clinic's live site

- **Google reviews** in the reviews band are samples, labelled as such on the page. Replace them with the clinic's own reviews.
- The consultation form shows a confirmation and offers to send the request by email; it does not store requests yet.
- The page carries `noindex` so search engines skip the demo.

## Media

Logo, clinic tour video, clinic stills and Mr Roy's portrait belong to Excellence Medical (video supplied by the client; portrait and testimonials from the clinic's website and YouTube channel). Treatment photos are from [Pexels](https://www.pexels.com/license/) and load from Pexels' image CDN.
