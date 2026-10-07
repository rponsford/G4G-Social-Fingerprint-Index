# Social Fingerprint Index

Gateway for Good's interactive card sort. People discover the causes they care about most and the strengths they bring, then get a personal Social Fingerprint.

This repository holds one central copy of the experience. Any web page (Kajabi or another site) shows it by adding a two line snippet, so a change made here updates every page at once.

## Add it to a page

In Kajabi, add a **Custom Code** section to the page and paste:

```html
<div id="social-fingerprint" data-index="g4g"></div>
<script src="https://rponsford.github.io/G4G-Social-Fingerprint-Index/sfi.js" defer></script>
```

`data-index` picks which organization's settings to use. `g4g` is the Gateway for Good version.

Optional extras:

- `data-group="rotary-sd-north"` tags every response from that page with a group code. A link can do the same: `...?group=rotary-sd-north`.
- `data-debug="true"` shows a "what we'd record" table on the results screen for testing.

## What's in here

| File | What it is |
|---|---|
| `content.json` | Every word in the experience: cards, card backs, questions, videos, and organization settings. Edit text here. |
| `sfi.js` | The program. Rarely needs changing. |
| `images/` | Card art, one file per card, named by card id. |
| `index.html` | A test page that imitates a Kajabi page. |

## Common edits (all in `content.json`)

- **Change card text:** find the card under `cards` by its `name` and edit `tag` (the one line description) or `items` (the bullets on the back).
- **Change a question:** find it under `questions` and edit `prompt` or `opts`.
- **Change a video:** replace the YouTube id under `videos`. Leave it blank (`""`) to hide that video.
- **Add an organization version:** copy the `g4g` block under `indexes`, give it a new id (for example `rotary-sd`), and change the name, subscribe wording, Kajabi tag, and next step options. Then use `data-index="rotary-sd"` in that page's snippet.
- **Turn on saving responses:** put the Google script address in `endpoint`. While it's blank, the experience runs in test mode and saves nothing.

Changes reach live pages within about 10 minutes.
