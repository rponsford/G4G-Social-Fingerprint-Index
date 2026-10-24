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

## Charity Analyzer (Analyze, Step 1: The Numbers)

The Charity Analyzer (nonprofit 990 ratios, organization search, Form 990-EZ, PDF report) lives in the `analyzer/` folder. It replaced GivingLens in October 2026. Kajabi page: gatewayforgood.com/charity-analyzer.

```html
<div id="charity-analyzer"></div>
<script src="https://tools.gatewayforgood.com/analyzer/charity-analyzer.js" defer></script>
```

Edit `analyzer/charity-analyzer.src.html`, then rebuild with `python3 givinglens/build.py analyzer/charity-analyzer.src.html analyzer/charity-analyzer.js charity-analyzer "Charity Analyzer" analyzer`. Test page: `analyzer/index.html` (the organization search only answers on gatewayforgood.com).

Saves go to the Worker's `/analysis` route (emailed report); the organization search uses `/org-search` and `/org`. Keep the ratio labels and questions in sync between the tool's `RATIOS` list and the Worker's `BANDS`.

## Shared files kept from retired tools

GivingLens and PurposeLens were retired in October 2026 (replaced by the Charity Analyzer and My Mission). Their scripts were removed, but these stay because live tools and already-sent emails use them:

- `givinglens/build.py`: the build script every tool uses.
- `givinglens/img/`: card icons and the email logo (report emails, Social Fingerprint report).
- `purposelens/img/g4g-logo.png`: logo used by the Social Fingerprint share image.

## Cloudflare Worker

`cloudflare/worker.js` is a copy of the code running at `g4gminion1.team-a92.workers.dev` (drafting, saving, emailed reports). It holds no keys; those live in Cloudflare Secrets. The Worker is connected to this repo through Cloudflare Workers Builds (root directory `cloudflare`, settings in `cloudflare/wrangler.jsonc`): every push to `main` redeploys it. Don't edit the Worker in the Cloudflare editor, because the next push overwrites it.

## My Mission (Social Fingerprint Index, Step 3)

My Mission is Step 3 of the Social Fingerprint Index (My Causes → My Strengths → My Mission). Part 1 writes the Giving Statement (AI drafting via the Worker's `/draft`). Part 2, "How you want to get involved," is six tile screens; the person's top strengths pre-select matching tiles (`STRENGTH_TILES`). The result screen builds the "Get My Search Prompt" text. Answers are kept in the shared workbook as `involvement`.

```html
<div id="mission"></div>
<script src="https://tools.gatewayforgood.com/mission/mission.js" defer></script>
```

Edit `mission/mission.src.html`, then rebuild with `python3 givinglens/build.py mission/mission.src.html mission/mission.js mission "My Mission" mission`. Test page: `mission/index.html` (tools.gatewayforgood.com/mission/).

My Mission posts to the Worker's `/mission` route, which saves the statement and answers (statements table, plus the person's sfi_responses row when the browser has their Index response id) and emails their UPDATED Social Fingerprint report: Giving Statement at the top, search prompt, and the giving path moved to Analyze. Set `COMMUNITY_URL` in `mission/mission.src.html` to show the community share button.
