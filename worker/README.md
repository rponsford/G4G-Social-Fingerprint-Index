# Worker add-ons

## Social Fingerprint emailed report (`sfi-report.js`)

The report is sent by the g4gminion1 Worker through Resend when someone finishes the Social Fingerprint Index and gives their email. It pulls card names and descriptions from the live `content.json`, so card edits show up in the email automatically.

**To turn it on**

1. In the Cloudflare editor, paste all of `sfi-report.js` near the top of the Worker, below any imports.
2. In the `POST /sfi` route, after the row is saved to D1, add this line. Use `isNew` (or your equivalent) so a repeat submission of the same `response_id` doesn't send a second email:

   ```js
   if (p.email && isNew) ctx.waitUntil(sendSfiReport(p, env));
   ```

   It uses the existing `RESEND_API_KEY` secret. It sends from `Gateway for Good <team@gatewayforgood.com>` and replies go to team@gatewayforgood.com.
3. Deploy, finish the test page with your own email, and check the inbox.

**Easy edits (top of the file)**

- `SFI_NEXT_LINKS`: the button under each "What would you like to do next?" choice. Leave `url` blank to show the line without a button.
- `SFI_BARRIER_TIPS`: the tip shown for each "What gets in the way?" answer (up to two per email).

`sfi-report-preview.html` shows the email with sample answers.
