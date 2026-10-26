# Gateway for Good: data security setup (Cloudflare dashboard)

Code for both pieces is in the repo. These steps happen in the Cloudflare dashboard, in this order.

## A. Human check (Turnstile)

1. Cloudflare dashboard → **Turnstile** → **Add widget**.
   - Name: `Social Fingerprint`
   - Hostnames: `gatewayforgood.com`, `www.gatewayforgood.com`, `tools.gatewayforgood.com`
   - Widget mode: **Invisible** (or Managed; the tool only shows it if Cloudflare needs a click)
2. Copy the **Site key** into `content.json` → `"turnstile_sitekey"` (or send it to Gigi). Wait ~10 minutes for the page to pick it up.
3. Only then: Workers → **g4gminion1** → Settings → Variables and Secrets → add secret **TURNSTILE_SECRET** = the widget's **Secret key**.
   - Order matters: with the secret set but no site key on the page, every save counts as "missing" and no reports get emailed.
4. Check `https://g4gminion1.team-a92.workers.dev/health` shows `"turnstile": true`.

## B. Admin Worker behind Cloudflare Access (replaces the export link)

1. Workers & Pages → **Create** → **Import a repository** → this repo.
   - Project name: `g4g-admin`, root directory: `/cloudflare-admin`, deploy command left as default.
2. Open **g4g-admin** → Settings → Domains & Routes → workers.dev → **Enable Cloudflare Access**.
   - Copy the **AUD tag** and **team domain** from the box that appears.
   - **Manage Cloudflare Access** → add the email addresses allowed in (Ryan, Yale, …).
3. g4g-admin → Settings → Variables and Secrets → add (as secrets):
   - `TEAM_DOMAIN` = `https://<team>.cloudflareaccess.com`
   - `POLICY_AUD` = the AUD tag
   - `FULL_ACCESS_EMAILS` = emails who may see names, emails and ZIP codes, comma separated
4. Visit `https://g4g-admin.<account>.workers.dev/`, sign in with the emailed code, and download a CSV to confirm.
5. Then turn off the old link: Workers → **g4gminion1** → Settings → Variables and Secrets → **delete `ADMIN_KEY`**.
   `/admin/export` and `/admin/kajabi-test` on g4gminion1 stop working the moment it's gone.

## What gets flagged

| Column | Values |
|---|---|
| `human_check` | `passed`, `failed`, `missing` (no token sent), `off` (before the secret was set) |
| `quality_flags` | `honeypot` (hidden field filled), `too_fast` (finished in under 60 seconds) |

`failed`, `missing` and `honeypot` rows are stored but get no email and no Kajabi sync, and the admin downloads leave them out unless you pick "incl. flagged". `too_fast` rows are kept in the downloads with the flag so you can filter them.

## C. Kajabi import (interim, until Kajabi's Public API is on)

The Gateway for Good plan doesn't include Kajabi's Public API yet (Oct 25, 2026: the token request returns 403), so the Worker can't create contacts. Until it does, the admin page has a **Kajabi import** card (full-access people only):

| File | Who | In Kajabi |
|---|---|---|
| Subscribed | checked "keep me informed", 13+ | tick **Subscribe to email marketing** |
| Not subscribed | everyone else with an email (incl. 13–17) | leave it unticked |

- One row per email across all three tools (Social Fingerprint, My Mission, Charity Analyzer), columns `Email, Name, Tags`. Tags match what the Worker's sync would add: Tool, Cause, Strength, Group (Group never for 13–17).
- Left out: bot-flagged rows, unfinished Social Fingerprint runs, rows with no email.
- **New** = not downloaded before, or picked up new tags or opted in since. Each download is recorded in the `kajabi_exports` table, and the card shows who downloaded last. **Everyone** re-downloads all; Kajabi matches on email, so a repeat import only updates.
- Weekly: Kajabi → Contacts → Import → choose the file → set the subscribe box as above → don't grant an offer.

When the Public API is on: add a new User API Key's ID and secret to g4gminion1 (KAJABI_CLIENT_ID / KAJABI_CLIENT_SECRET), run a one-time backfill so everyone saved so far gets synced with ZIP codes, then remove this card and drop `kajabi_exports`.
