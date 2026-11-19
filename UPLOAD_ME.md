# v14.4 — what to upload (short)

**Why:** your phone showed "install_disabled: v14.1 updates open in the browser". The fixed update code was missing from the v14.3 zip. v14.4 contains it.

1. **App repo** (`SquadSplit/iFiNeX-Mobile`): unzip `iFiNeX_v14.4_ONLY_UPDATED_B_APP_REPO.zip` → GitHub → **Add file → Upload files** → drag everything (also the `.github` folder) → Commit. The key file is
   `android/app/src/main/java/io/github/squadsplit/app/IfinexUpdatePlugin.java` (must NOT contain the words `install_disabled`; you can open it on GitHub and press Ctrl+F to check).
2. **Website repo**: unzip zip A → upload everything → Commit. Do NOT upload any `ifinex-config.json` (there is none inside).
3. **Actions** tab on the app repo → wait for green → install the new APK (v7.4.0). Then Updates shows: **Download & install (direct)** → after the download the button changes to **Install now** → Android install screen.
4. Your `ifinex-config.json` (Google block with `clientId`, `redirect`, `tokenProxy`, no secret) from the v14.3 guide stays unchanged.

**Open-source repo:** `iFiNeX-OpenSource_v14.4.zip` is a COMPLETE repo (unzip → upload to a NEW public GitHub repo). It has no keys/secrets/personal data. Read its `README.md`, then `docs/01-START-HERE.md`.
