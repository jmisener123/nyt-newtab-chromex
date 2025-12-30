# NYT New Tab Chrome Extension

A lightweight Chrome extension that replaces the New Tab page with a clean, custom view powered by New York Times content.

Built as a personal project to explore Chrome extensions, client-side APIs, and browser UI customization.

---
## Preview

![NYT New Tab Extension preview](screenshots/newtabpreview.png)


## What it does

- Overrides Chrome’s default New Tab page
- Displays curated NYT content in a minimal layout
- Loads instantly with each new tab
- Runs locally as an unpacked Chrome extension

---

## How to use it (local install)

1. Open Chrome and go to:
   chrome://extensions

2. Enable **Developer mode**
3. Click **Load unpacked**
4. Select the folder containing `manifest.json`

Open a new tab — the extension will load automatically.

---

## Development notes

- This extension is loaded locally using Chrome’s “Load unpacked” mode
- Changes require clicking **Reload** in `chrome://extensions`
- The extension depends on the local folder path remaining unchanged

---

## Configuration

If present, `config.js` contains local configuration values and is excluded from version control.

---

## Status

Personal project / experimental  
Not published to the Chrome Web Store
