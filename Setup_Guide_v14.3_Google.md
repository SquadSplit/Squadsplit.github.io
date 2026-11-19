# iFiNeX v14.3 — Step-by-step guide (for a non-technical person)

You do 5 things, in this order. Each step says WHERE to click and WHAT YOU SHOULD SEE. Do not skip.

IMPORTANT FIRST: the GitHub "Secret scanning" box you saw → click **Cancel**. Never click "Allow secret". In v14.3 NO secret goes into GitHub at all (the secret lives inside Supabase). If you already pushed a secret anywhere, do Step 0.

---
## Step 0 — Only if a secret was ever pushed to GitHub
Google Cloud Console → APIs & Services → Credentials → click **iFiNeX sign-in** → under "Client secrets" click **Add secret** → copy the NEW one → disable the old one (Disable). Use the new one in Step 3.

## Step 1 — Which of your 3 Google keys is for what
| Key name (Google Credentials page) | What it is for | What you do |
|---|---|---|
| **iFiNeX server** (Web) | Server-mode Google Drive backup (edge function `gdrive-backup`) | Nothing. Leave it. |
| **iFiNeX sign-in** (Web) | NEW: "Continue with Google" in standalone mode | Use it (Steps 2–3). |
| **TVs and Limited Input devices** | Old "type a code" screen | Not needed any more. You may delete it. |

## Step 2 — Check the "iFiNeX sign-in" key (Google Cloud Console)
1. https://console.cloud.google.com → top-left project picker → your iFiNeX project.
2. Left menu: **APIs & Services → Credentials**.
3. Click **iFiNeX sign-in**.
4. Find **Authorized redirect URIs**. It must contain exactly:
   `https://squadsplit.github.io/gdrive-return.html`
   (if missing: **+ Add URI**, paste it, **Save**).
5. Copy the **Client ID** (starts with 113807571812-… ends with .apps.googleusercontent.com) → keep it in Notepad.
6. Under **Client secrets** copy the secret (starts with GOCSPX-) → keep it in Notepad. **Never paste it into GitHub or into chat.**
7. Left menu **OAuth consent screen** (or "Audience") → if it says **Testing**, click **Publish app → In production → Confirm**. (If left on Testing, the nightly backup stops after 7 days.)
   Also on the same screen, **Data access/Scopes** must include `.../auth/drive.appdata`.
✅ You should now have 2 things in Notepad: the Client ID and the secret.

## Step 3 — Put the secret into Supabase (NOT GitHub)
1. https://supabase.com/dashboard → open your project.
2. Left menu **Edge Functions** → top tab/button **Secrets** (sometimes "Manage secrets").
3. **Add new secret** — Name: `GSIGN_CLIENT_ID` — Value: your Client ID → **Save**.
4. **Add new secret** — Name: `GSIGN_CLIENT_SECRET` — Value: the GOCSPX-… secret → **Save**.
5. Check: open this address in your browser:
   `https://lznnetxeklmdrykxtsbm.supabase.co/functions/v1/google-oauth`
   ✅ You should see: `{"ok":true,"service":"iFiNeX google-oauth","configured":true}`
   If it says `"configured":false` → a secret name is spelled wrong (must be exactly GSIGN_CLIENT_ID and GSIGN_CLIENT_SECRET).
(The function `google-oauth` itself is already deployed for you. Its code is also in `google-oauth_edge-function_index.ts` for reference.)

## Step 4 — Edit `ifinex-config.json` (TWO places)
You said your file has no "google" block. Correct — it never had one. You ADD it.

Easiest: open the file `config-files/ifinex-config.json` from this pack, change ONE thing (the Client ID on the line that says PASTE-YOUR-CLIENT-ID-HERE) and copy the whole content over your file.

If you prefer to edit by hand, your file now has 8 lines:
- Line 7 is the `"supabaseKey": "eyJ…"` line → **add a comma `,` at the very end of line 7**.
- **Insert these new lines 8 to 12** (right after line 7, before the final `}` which becomes line 13):
```
  "google": {
    "clientId": "PASTE-YOUR-CLIENT-ID-HERE.apps.googleusercontent.com",
    "redirect": "https://squadsplit.github.io/gdrive-return.html",
    "tokenProxy": "https://lznnetxeklmdrykxtsbm.supabase.co/functions/v1/google-oauth"
  }
```
Note: there is NO secret in this block. That is correct and safe.

**Place 1 — website:** GitHub → `SquadSplit/Squadsplit.github.io` → file `ifinex-config.json` (top level of the repo) → ✏️ pencil → edit as above → **Commit changes**.
**Place 2 — Android app:** GitHub → `SquadSplit/iFiNeX-Mobile` → open folder `www` → file `ifinex-config.json` → ✏️ pencil → same edit → **Commit changes**. (If the file does not exist there, use **Add file → Create new file**, name it `www/ifinex-config.json`.)
✅ GitHub must NOT show the red "Secret scanning" box now. If it does, you pasted a GOCSPX- secret by mistake: remove it.

## Step 5 — Upload the new code and build the app
1. **Website:** unzip `iFiNeX_v14.3_ONLY_UPDATED_A_WEBSITE_REPO.zip` → GitHub `Squadsplit.github.io` → **Add file → Upload files** → drag ALL files/folders from inside the unzipped folder (including the new `gdrive-return.html` and the `iFiNeX-Demo` folder) → **Commit**. Do NOT upload any `ifinex-config.json` from the zip (there is none in A; the sample is in `config-files/`).
2. **App:** unzip `iFiNeX_v14.3_ONLY_UPDATED_B_APP_REPO.zip` → GitHub `iFiNeX-Mobile` → **Add file → Upload files** → drag everything (including the hidden `.github` folder if shown) → **Commit**. Then repo **Actions** tab → wait for the green tick (~10 min) → download/install the new APK (v7.3.0).
3. If the Actions run is red: open it, copy the first red error line, send it to Claude.

## Step 6 — Test (2 minutes)
1. Open the app → choose **Standalone** → tap **Continue with Google**.
   ✅ The phone browser opens Google → pick your account → **Allow** → it returns to iFiNeX (if it stays on a "Sign-in done" page, tap **Open iFiNeX**).
2. You get **Restore latest backup** (if one exists) or **Start fresh**.
3. Settings → Backup & Restore shows your Google account and "Backup: automatic around 12:00 AM".
4. Next morning: Backup & Restore must show a "last backup" time after midnight.
Errors show a clear message. `redirect_uri_mismatch` = Step 2.4 address typed differently. `not_configured`/503 = Step 3.

## Updates inside the app (your standing preference)
The Updates screen always shows, in this order: **1. Download & install (direct, inside the app)** → **2. Download in browser instead** → **3. Later**.
Warning in plain words: direct install needs a permission ("install other apps"). Google Play Protect dislikes it and may show "Harmful app blocked" for sideloaded APKs. If that appears: More details → **Install anyway**. Only publishing through Google Play removes it permanently. The order of the 3 buttons stays as you want.

## Where every changed thing lives (reference)
| What | Repo | File |
|---|---|---|
| Google sign-in code | website + app | `ifinex-gdrive.js` (v14.3 block: functions `webFlow`, `authUrl`, `gtoken`, `exchange`, `webConnect`) |
| Return page after Google | website + app | `gdrive-return.html` |
| Allowed hosts (CSP) | website + app | `ifinex-config.js` lines 83–85 |
| Secret holder | Supabase | Edge Function `google-oauth` + 2 secrets |
| Android hand-back | app | `android/app/src/main/java/io/github/squadsplit/app/MainActivity.java` (`captureOAuth`), `IfinexBackupPlugin.java` (`takeOAuth`), `AndroidManifest.xml` (intent-filter with `android:host="oauth"`) |
| Midnight backup refresh | app | `IfinexAutoBackup.java` method `accessToken` (uses the server function) |
| Updater buttons | website + app | `ifinex-update.js` line 114 (button 1) and lines 139–141 (buttons 2–3); install code `IfinexUpdatePlugin.java`; permission in `AndroidManifest.xml` line 73 |
