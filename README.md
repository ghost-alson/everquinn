# Everquinn

A cozy place to track what you read — a book-tracking app with RPG-style
leveling and unlockable decor cosmetics. Built for qunyx.

## Run it

This is a static web app (a PWA). No build step, no server needed — just serve
the files, or open `index.html` from any static host.

## Publish it (GitHub Pages)

1. Create a new **public** repository (for example `everquinn`).
2. Upload everything in this folder: `index.html`, `manifest.webmanifest`,
   `sw.js` and the `icons` folder. Keep the `icons` folder as it is.
   `index.html` must stay in the top level of the repository.
3. In the repository: **Settings → Pages → "Deploy from a branch"**, branch
   `main`, folder `/(root)`, Save.
4. After a minute the site is live at `https://YOUR-NAME.github.io/everquinn/`
5. On the iPhone, open that address in Safari, tap Share, then
   **"Add to Home Screen"**.

## Updating later

Replace `index.html` in the repository. The app picks up the new version the
second time it is opened. Books and settings stay on the device (localStorage).
