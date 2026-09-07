# Drop network conversion exports here

One CSV per network. Any column layout: the parser finds the SubID and
commission columns by name.

**Required columns** (whichever the network uses):
- SubID: `sid1` (PartnerStack), `UniqueId` (Commission Factory), `utm_content` (Juniper),
  or any of `sub_id`, `subid`, `sub1`, `s1`, `custom_id`, `click_ref`
- Commission: `commission`, `payout`, `earnings`, `amount`, `revenue` or similar

Then: `npm run reconcile`

Moshy and Mosh send no SubID, so their rows will appear as **unattributed**.
That is expected until the parameter is confirmed and added to `SUBID_PARAM` in
`src/components/AffiliateClickTracker.tsx`. The script names them rather than
guessing which page produced them.

Exports are not committed: this directory is gitignored except for this file.
