# iFiNeX v14.1 — Setup guide (no technical knowledge needed)

## Step 1 — Database (Supabase) — usually already done
Your live database is already upgraded (done by Claude). Only needed if you ever rebuild: open supabase.com → your project → **SQL Editor** → New query → paste file `1 - ... UPGRADE` → **Run**. For a brand-new project use file `2 - ... FULL (no data)`. File `3 - WITH DATA` is private: never upload it to GitHub.

## Step 2 — Website (GitHub)
1. Unzip `iFiNeX_v14.1_ONLY_UPDATED_A_WEBSITE_REPO.zip`.
2. Open https://github.com/SquadSplit/Squadsplit.github.io → **Add file → Upload files**.
3. Drag everything inside the unzipped folder in (keep folder `iFiNeX-Demo` and its sub-folders). Do NOT upload your own `ifinex-config.json`.
4. **Commit changes**. Wait 2 minutes. Open the site, hard-refresh. Settings should show web 14.0.
5. Demo: https://squadsplit.github.io/iFiNeX-Demo/ (new "Standalone" demo included).

## Step 3 — App (builds the APK)
1. Unzip `iFiNeX_v14.1_ONLY_UPDATED_B_APP_REPO.zip`.
2. Open https://github.com/SquadSplit/iFiNeX-Mobile → **Add file → Upload files**. Drag everything in (includes hidden folder `.github`; if your browser hides it, drag the `.github` folder separately). Commit.
3. Click **Actions** tab → the build starts → wait ~10 min → download the APK from the run's **Artifacts** / Releases.
4. If the build fails, open the red run, copy the first red error line and send it to Claude.
5. Install the new APK on the phone once (old version can stay; same signing key).
Android Studio users: use zip C instead.

## Step 4 — Google sign-in for standalone backups (one-time, owner only)
1. https://console.cloud.google.com → create project → **APIs & Services → Library** → enable **Google Drive API**.
2. **OAuth consent screen** → External → fill app name → add scope `.../auth/drive.appdata` → then click **Publish app -> In production** (Testing mode expires tokens after 7 days).
3. **Credentials → Create credentials → OAuth client ID → type "TVs and Limited Input devices"**. Copy client id and secret into `ifinex-config.json` (the gdrive keys). Upload that file to the website repo.

## Step 5 — Using the new features
- **Compare**: open Bill Tracker / Expense tracker / Budget → tap **Compare** → choose months or dates, 2–6 periods → export Excel, PDF or CSV.
- **Standalone backup**: Settings → Backup & Restore → Sign in with Google. Backup runs automatically around 12:00 AM (Android may delay it a little; opening the app also catches up).
- **New phone/reinstall**: pick standalone → Continue with Google → choose **Restore latest backup** or **Start fresh**. Restore any time via Backup & Restore.
- **Clone**: Expense tracker period menu → Clone (enter duration + name). Budget → Clone.
- **Categories**: choosing tracker type (Mess, Groceries…) gives only relevant categories; editable.

## Step 6 — Test the midnight backup
Sign in, set phone clock/wait overnight, next morning Backup & Restore must show a "last backup" time from after midnight. Don't force-stop the app.

## Step 7 — Supabase disk-IO alert
Dashboard → Reports → Database (look at Disk IO). Settings → Compute and Disk: if the size is Nano/Micro, upgrade one step. Fix already applied: 6-hour throttle + 5-minute polling.

## Play Protect note
Sideloaded APKs can show "unrecognized app". Tap *More details → Install anyway*. Permanent fix = publish via Google Play.

---
## v14.1 additions
**Where the Google key goes:** open `ifinex-config.json`. After the `"supabaseKey"` line add a comma, then `"google": { "clientId": "....apps.googleusercontent.com", "clientSecret": "GOCSPX-..." }`. Do this in the website repo AND in the app repo (`www/ifinex-config.json`), then let GitHub build a new APK. Never upload the COMPLETE zip's config over yours.
**Google consent screen:** click **Publish app -> In production**. In Testing mode nightly backups stop after 7 days.
**Play Protect:** v14.1 removes the "install other apps" permission; updates now open in the browser. If Android still blocks: More details -> Install anyway. Permanent fix = Google Play.
