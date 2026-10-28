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

### Group mode ("Our group")

The toggle at the top of My Mission switches between **Myself** and **Our group**. A link can open it already in group mode: `gatewayforgood.com/social-fingerprint-mission?mode=group` (the book's group QR code uses this). `?mode=me` forces Myself; `data-mode="group"` on the embed does the same as the link.

- Group mode keeps its own notes, statement, causes, strengths and Part 2 answers in `gfg_workbook_v1` under `group`, so a person's own Social Fingerprint and Giving Statement are never overwritten.
- Group setup: name, kind of group, size, ages. Causes and strengths are entered by hand from everyone's results: either just the focus causes (up to 3) or all the group's causes with up to 3 starred as focus (no stars = the most-picked three). Each cause and strength can carry an optional "how many of us" count.
- Wording switches to we/our everywhere, Gigi drafts in group voice (with the group's kind, size and other causes as context, never its name), Part 2 skips "Who will you do this with?", and the search prompt is written for a group.
- `/mission` and `/mission/report` take a `group` object and send a **Group Social Fingerprint report**: Our Giving Statement, group snapshot, focus causes and strengths with counts, the rest of the group's causes and strengths, and the giving path. Saved as `statements.tool = "mission-group"` with `group_json`; the person's `sfi_responses` row is not touched. Kajabi tags: `Tool: My Mission`, `Tool: My Mission (Group)` and the focus causes.
- GA4 events: `mission_mode` (mode, source = link or toggle), `mission_group_report`, and `mission_pdf` now carries `mode`.
- Later (full community report): group codes fill `group.causes` / `group.strengths` automatically in the same shape, so the report doesn't change.

### Group statement QR code (MAD Guidebook)

`qr/group-statement-qr.svg` (print, vector) and `qr/group-statement-qr.png` (2415 px). Link in `qr/group-statement-qr-link.txt`: `?mode=group&utm_source=mad_guidebook&utm_medium=qr_code&utm_content=group`. Error correction H, version 11, icon `icons/group-statement.svg` at 21% width (scan-tested with zbar and OpenCV down to 180 px, plus blurred, rotated and angled captures). Print at least 1.25 in (32 mm) wide with the white border.

## Download my report (PDF)

Both the Social Fingerprint results screen and My Mission's last screen have a "Download my report (PDF)" button. It opens the report as its own clean page and brings up the print window, where "Save as PDF" makes the file (Mac: Save as PDF in the print dialog; iPhone/iPad: Share, then Save to Files). If pop-ups are blocked it prints from a hidden frame instead. The helper (`pdfDoc` / `reportPdf`) is copied in `sfi.js` and `mission/mission.src.html`; change both together.

- Social Fingerprint: prints the on-screen report it already has (from `/sfi/report`). Not offered on the simple view (under 13, or if the report can't load).
- My Mission: calls the Worker's `/mission/report`, which builds the same updated report `/mission` emails but stores and sends nothing.
- GA4 events: `sfi_pdf`, `mission_pdf`.
