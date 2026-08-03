# website

My personal website — <https://alexandre-martin.fr>

A single static page with no runtime dependencies: hand-written HTML, one
stylesheet, and ~110 lines of vanilla JS. Parcel is only used to minify and
fingerprint assets for production.

## Layout

```
index.html        markup, meta tags and JSON-LD
styles/main.css   design tokens, layout, components, responsive rules
styles/fonts.css  self-hosted Inconsolata
scripts/app.js    mobile nav, scroll reveal, scroll spy
images/           photos and technology logos
```

## Develop

No build step is required — serving the folder is enough:

```
python3 -m http.server 8000
```

Or with Parcel's dev server and hot reload:

```
npm install
npm run dev
```

## Build

```
npm install
npm run build
```

## Notes

- The age in the "À propos" section is computed from the `data-birthdate`
  attribute on the `[data-age]` element in `index.html`.
- The page is dark only; there is no light theme and no theme toggle.

## License

MIT for the code.
Images used in this repository are the property of their respective owners.
