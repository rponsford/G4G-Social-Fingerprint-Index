# Social Fingerprint Index

Gateway for Good's interactive card sort. People discover the causes they care about most and the strengths they bring, then get a personal Social Fingerprint.

This repository holds one central copy of the experience. Any web page (Kajabi or another site) shows it by adding a two line snippet, so a change made here updates every page at once.

## Add it to a page

In Kajabi, add a **Custom Code** section to the page and paste:

```html
<div id="social-fingerprint" data-index="g4g"></div>
<script src="https://tools.gatewayforgood.com/sfi.js" defer></script>
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

## GivingLens

GivingLens (the nonprofit 990 ratio calculator, outreach notes and research library) lives in the `givinglens/` folder and is added to a page the same way:

```html
<div id="givinglens"></div>
<script src="https://tools.gatewayforgood.com/givinglens/givinglens.js" defer></script>
```

| File | What it is |
|---|---|
| `givinglens/givinglens.src.html` | The editable source: text, ratios, ranges and questions. |
| `givinglens/givinglens.js` | The built script pages load. Rebuild after editing the source with `python3 givinglens/build.py givinglens/givinglens.src.html givinglens/givinglens.js`. |
| `givinglens/index.html` | A test page. |

Saved and shared analyses go to the Gateway for Good Cloudflare Worker (`g4gminion1.team-a92.workers.dev`).

## PurposeLens

PurposeLens (guidebook Step 2: Purpose, Vision and Mission statements with AI drafting) lives in the `purposelens/` folder:

```html
<div id="purposelens"></div>
<script src="https://tools.gatewayforgood.com/purposelens/purposelens.js" defer></script>
```

Edit `purposelens/purposelens.src.html`, then rebuild with `python3 givinglens/build.py purposelens/purposelens.src.html purposelens/purposelens.js purposelens "PurposeLens" purposelens`.

Both tools show a "Make a Difference journey" strip (Social Fingerprint → PurposeLens → MAD Profile → GivingLens). The links are in the `JOURNEY` list near the top of each tool's script; a blank `url` shows "Coming soon".

## Cloudflare Worker

`cloudflare/worker.js` is a copy of the code running at `g4gminion1.team-a92.workers.dev` (drafting, saving, emailed reports). It holds no keys; those live in Cloudflare Secrets. The Worker is connected to this repo through Cloudflare Workers Builds (root directory `cloudflare`, settings in `cloudflare/wrangler.jsonc`): every push to `main` redeploys it. Don't edit the Worker in the Cloudflare editor, because the next push overwrites it.

## My Mission (Social Fingerprint Index, Step 3)

My Mission replaces PurposeLens as Step 3 of the Social Fingerprint Index (My Causes → My Strengths → My Mission). Part 1 writes the Giving Statement (same drafting as PurposeLens, via the Worker's `/draft`). Part 2, "How you want to get involved," is six tile screens; the person's top strengths pre-select matching tiles (`STRENGTH_TILES`). The result screen builds the "Get My Search Prompt" text. Answers are kept in the shared workbook as `involvement`.

```html
<div id="mission"></div>
<script src="https://tools.gatewayforgood.com/mission/mission.js" defer></script>
```

Edit `mission/mission.src.html`, then rebuild with `python3 givinglens/build.py mission/mission.src.html mission/mission.js mission "My Mission" mission`. Test page: `mission/index.html` (tools.gatewayforgood.com/mission/).

Not yet in the Worker: `/statement` accepts the Mission email as-is but ignores `involvement` and `searchPrompt`, and the email still says PurposeLens.
