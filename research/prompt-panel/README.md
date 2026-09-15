# AI prompt panel

A fixed set of questions asked every month to ChatGPT (search on), Perplexity, Claude (web search on) and Google AI Mode, to see whether Refer Labs is cited. The prompts do not change between runs. That is the point: a month-on-month change then reflects the engines, not a different question.

**When:** first week of each month. First run: October 2026.

**How:**
1. Ask each prompt in a fresh chat, logged out where possible, with location set to Australia.
2. Record one row per prompt per engine in `YYYY-MM.csv` (copy `template.csv`).
3. Note in the `edits` column any change made to a cited or target page since the last run (see CLAUDE.md: a before/after is only readable when edit dates are known).

**Columns:** `run_date, engine, prompt_id, prompt, cited (y/n), refer_labs_url, position_in_citations, competitor_urls, answer_mentions_code (y/n), notes, edits`

**Read it as:** unbranded citation share by vertical (health, pets, energy, software), plus which competitor URLs recur. Cross-check against Bing Webmaster Tools' AI Performance report and Search Console's generative AI report for the same month. Treat single-month moves as noise: engines' answers vary run to run.

**Never** type "Refer Labs" into an unbranded prompt; branded lookups are measured separately (prompts B01-B04).
