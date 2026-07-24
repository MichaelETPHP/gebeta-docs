# Play Store Build & Submit — Quick Steps

Use this when the EAS free-tier cloud build quota is used up (resets monthly,
check https://expo.dev/accounts/zmichaeleth/settings/billing).
`eas build --local` does **not** work on Windows for Android — use this
manual path instead. Proven working for both apps.

Shell: **Command Prompt (`cmd.exe`)**, not PowerShell.

Applies identically to **both** `BahirdarDriver` and `BahirdarRide` — swap
the folder name and the keystore details below for whichever app you're
building.

---

## 1. Regenerate the native project
```cmd
cd C:\SVELT_APP\CityBird-Bahirdar\BahirdarDriver
:: or: cd C:\SVELT_APP\CityBird-Bahirdar\BahirdarRide

npx expo prebuild --platform android --clean
```
⚠️ `--clean` wipes and regenerates the **entire** `android\` folder every
time, which resets `versionCode` to `1` and resets the release signing back
to the debug key — so **steps 2 and 3 below must be redone every time you
run this with `--clean`.**

**Shortcut:** if nothing native changed since your last build (no new native
module, no `app.json`/`app.config` change), drop `--clean`:
```cmd
npx expo prebuild --platform android
```
This does NOT wipe `android\`, so your signing config from last time is
still there — skip straight to step 3.

## 2. Wire up real release signing
Open `android\app\build.gradle`. In `signingConfigs`, add a `release` block
next to `debug`:

**Driver app:**
```gradle
release {
    storeFile file('bahirdar-driver-upload.jks')
    storePassword 'BahirdarDriver@2026'
    keyAlias 'upload'
    keyPassword 'BahirdarDriver@2026'
}
```
Copy the keystore into place:
```cmd
copy credentials\bahirdar-driver-upload.jks android\app\bahirdar-driver-upload.jks
```

**Rider app** (keystore + passwords already saved in `credentials.json` at
the project root — no need to re-download via `eas-cli credentials`):
```gradle
release {
    storeFile file('keystore.jks')
    storePassword '01259492296f768e8cdac8876a9e4540'
    keyAlias '9b2a40fd7f27272b4c43a6f83c9a9805'
    keyPassword 'd8ee7d3b7ac130c245990e5a842a3c59'
}
```
Copy the keystore into place:
```cmd
copy credentials\android\keystore.jks android\app\keystore.jks
```

Then, for either app, in `buildTypes { release { ... } }` change:
```gradle
signingConfig signingConfigs.debug   →   signingConfig signingConfigs.release
```

## 3. Bump the version code
Play Console → **[App] → App bundle explorer** → find the current highest
`versionCode` across all tracks. In `android\app\build.gradle`, set
`versionCode` to **one higher** than that number.

## 4. Build the signed `.aab`
```cmd
cd android
set NODE_ENV=production
gradlew.bat bundleRelease
```
Wait for `BUILD SUCCESSFUL` (5–20 min on a cold run). Output:
```
android\app\build\outputs\bundle\release\app-release.aab
```

## 5. Auto-submit
Run from the **app root**, not from inside `android\`:
```cmd
cd C:\SVELT_APP\CityBird-Bahirdar\BahirdarDriver
npx eas-cli submit -p android --path android\app\build\outputs\bundle\release\app-release.aab
```
Expect: `✔ Submitted your app to Google Play Store!`

## 6. Verify
Play Console → **App bundle explorer** — new version code appears within
minutes. **Releases overview** shows it "In review."

---

### When cloud quota resets
Skip all of this — just run, per app:
```cmd
npx eas-cli build -p android --profile production --non-interactive --no-wait --auto-submit
```

*(Full troubleshooting and background: see `DEPLOYMENT_WITHOUT_EAS_PAID.md`.)*
