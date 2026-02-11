# ✅ Firebase Notifications - Setup Checklist

## Phase 1: Get Firebase Credentials (Do This First)

### Create/Access Firebase Project
- [ ] Go to https://console.firebase.google.com/
- [ ] Sign in with Google account
- [ ] Create new project OR select existing one
- [ ] Wait for project to be ready

### Enable Cloud Messaging
- [ ] In Firebase Console, click your project
- [ ] Go to **Messaging** (left sidebar)
- [ ] Click **Cloud Messaging** tab
- [ ] Note the **Server public key** (for VAPID)

---

## Phase 2: Get Admin SDK Credentials

### Generate Service Account Key
- [ ] In Firebase Console, click ⚙️ **Settings** (top-right)
- [ ] Click **Project Settings**
- [ ] Go to **Service Accounts** tab
- [ ] Click **Generate New Private Key**
- [ ] Save the JSON file (keep it safe!)

### Copy Values from JSON File
- [ ] Open the downloaded JSON file
- [ ] Find `"project_id"` → Copy to `FIREBASE_PROJECT_ID`
- [ ] Find `"client_email"` → Copy to `FIREBASE_CLIENT_EMAIL`
- [ ] Find `"private_key"` → Copy to `FIREBASE_PRIVATE_KEY` (keep quotes & newlines)

---

## Phase 3: Get Client SDK Credentials

### Find Web App Config
- [ ] In Firebase Console, click ⚙️ **Settings**
- [ ] Click **Project Settings**
- [ ] Go to **General** tab
- [ ] Scroll to **Your Apps** section
- [ ] Click the **Web** app (or create one with </>)

### Copy Configuration
- [ ] You should see firebaseConfig object
- [ ] `apiKey` → Copy to `NEXT_PUBLIC_FIREBASE_API_KEY`
- [ ] `authDomain` → Copy to `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
- [ ] `projectId` → Copy to `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
- [ ] `storageBucket` → Copy to `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`
- [ ] `messagingSenderId` → Copy to `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
- [ ] `appId` → Copy to `NEXT_PUBLIC_FIREBASE_APP_ID`

---

## Phase 4: Get VAPID Key

### Find Web Push Certificates
- [ ] In Firebase Console, go to **Cloud Messaging** tab
- [ ] Scroll to **Web Push certificates**
- [ ] Copy the **Server public key**
- [ ] Paste into `NEXT_PUBLIC_FIREBASE_VAPID_KEY`

---

## Phase 5: Update .env.local

### Edit the File
- [ ] Open `.env.local` in project root
- [ ] Replace all `your_*` placeholders with real values
- [ ] **Special:** `FIREBASE_PRIVATE_KEY` must keep the quotes and have actual newlines
- [ ] Save the file

### Verify Format
- [ ] All 11 variables are filled in (not all might be visible on one screen)
- [ ] No extra spaces before/after values
- [ ] Private key still has `-----BEGIN PRIVATE KEY-----` at start

---

## Phase 6: Get Device Token

### Allow Notifications
- [ ] Open http://localhost:3000 in browser
- [ ] Browser will ask "Allow notifications?" → Click **Allow**
- [ ] (If not asked, check site settings and reset permissions)

### Copy Token from Console
- [ ] Press **F12** to open DevTools
- [ ] Go to **Console** tab
- [ ] Look for message: `✅ YOUR DEVICE TOKEN (copy this to .env.local as DEVICE_TOKEN): [long-string]`
- [ ] Copy the entire token string

### Add to .env.local
- [ ] Open `.env.local`
- [ ] Find `DEVICE_TOKEN=your_device_token_from_browser_console`
- [ ] Replace with your actual token
- [ ] Save the file

---

## Phase 7: Test Notifications

### Refresh Site
- [ ] Refresh page (Ctrl+R or Cmd+R)
- [ ] Check that Firebase errors are gone in console

### Test YES Button
- [ ] Click the **YES** button
- [ ] Check your device for notification: "She said YES! 😭💖"
- [ ] ✅ If you see it, this button works!

### Test NO Button
- [ ] Go back (or refresh page)
- [ ] Click the **NO** button
- [ ] Check your device for notification: "She clicked NO (but it's moving away anyway 😌)"
- [ ] ✅ If you see it, this button works!

### Test Activity Selection
- [ ] Click an activity (Cafe date or Picnic)
- [ ] Check your device for notification: "She chose: [Activity]! 🎉"
- [ ] ✅ If you see it, this button works!

---

## Phase 8: Troubleshooting

### Site Won't Load
- [ ] Check `.env.local` is saved
- [ ] Check all Firebase values are filled in
- [ ] Check for typos in env variable names

### Notifications Not Working
- [ ] Verify browser allows notifications for this site
- [ ] Verify `DEVICE_TOKEN` is correct in `.env.local`
- [ ] Check browser console for Firebase errors
- [ ] Restart dev server (stop & `npm run dev`)

### Token Not Showing in Console
- [ ] Make sure notifications permission was granted
- [ ] Check "Console" tab (not "Network" or "Elements")
- [ ] Reset site data and reload (Settings > Clear)

### Firebase Errors in Console
- [ ] Double-check all `NEXT_PUBLIC_FIREBASE_*` values
- [ ] Make sure project ID matches everywhere
- [ ] Make sure Cloud Messaging is enabled in Firebase

---

## 🎉 Success Criteria

You'll know it's working when:

- ✅ Site loads at http://localhost:3000
- ✅ No Firebase errors in console
- ✅ Browser asks for notification permission on first load
- ✅ Token appears in console
- ✅ Clicking YES sends "She said YES! 😭💖" notification
- ✅ Clicking NO sends "She clicked NO..." notification
- ✅ Selecting activity sends "She chose:..." notification

---

## 📝 Reference

See these files for more details:
- **NOTIFICATIONS_READY.md** - Quick overview
- **FIREBASE_SETUP.md** - Detailed setup guide
- **ENV_EXAMPLE.md** - Environment file format

---

**You're doing great! 🚀 Just follow the checklist and you'll have it working in minutes.**
