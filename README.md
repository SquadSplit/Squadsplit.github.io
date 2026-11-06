<div align="center">

# iFiNeX

**Plan · Track · Save · Grow** — bills, cards, shared expenses, trackers and budgets in one app.

[![Live Demo](https://img.shields.io/badge/▶_Live_Demo-open-4d96ff?style=for-the-badge)](https://squadsplit.github.io/iFiNeX-Demo/)
[![Website](https://img.shields.io/badge/Website-squadsplit.github.io-1a1c33?style=for-the-badge)](https://squadsplit.github.io)
[![Android app](https://img.shields.io/badge/Android-app-3ddc84?style=for-the-badge&logo=android&logoColor=white)](https://github.com/SquadSplit/iFiNeX-Mobile/releases/latest)

[**Live demo**](https://squadsplit.github.io/iFiNeX-Demo/) · [Website](https://squadsplit.github.io) · [Android app](https://github.com/SquadSplit/iFiNeX-Mobile) · [Privacy](https://squadsplit.github.io/privacy.html) · [Terms](https://squadsplit.github.io/terms.html)

</div>

## Try it now — no sign-up

[![Try the live demo](iFiNeX-Demo/img/demo-landing.png)](https://squadsplit.github.io/iFiNeX-Demo/)

Open the **[live demo](https://squadsplit.github.io/iFiNeX-Demo/)**. The first screen lets you choose:

| Option | What you get |
|---|---|
| 🖥️ **Website** | The full web app on a desktop-size screen (you are *Alex*, the admin) |
| 📱 **Mobile app** | The Android app experience in a phone frame (you are *Priya*, a member) |
| ↔ **Both at once** | Website and phone side by side with a realtime activity feed |

It is more than a preview — it is a complete guide to the app:

- **18 guided walkthroughs** (spend, cards, party ledger, admin, delegate access, plans, trips, budget, squads, import/export, backup, Google Drive, themes…)
- **Request Inspector** — see every database call the app makes and why the database allows it
- **Searchable guide to every option and function** (77 entries) and a **database explorer** (34 tables)
- Roles table, key flows, and honest limits

Everything uses fictional people and fake data and runs only in your browser. Nothing is stored or sent anywhere, and reloading resets it.

<p align="center">
<a href="https://squadsplit.github.io/iFiNeX-Demo/"><img src="iFiNeX-Demo/img/demo-web.png" width="46%" alt="Website walkthrough"></a>
<a href="https://squadsplit.github.io/iFiNeX-Demo/"><img src="iFiNeX-Demo/img/demo-inspector.png" width="46%" alt="Request inspector"></a>
</p>
<p align="center">
<a href="https://squadsplit.github.io/iFiNeX-Demo/"><img src="iFiNeX-Demo/img/demo-mobile.png" width="30%" alt="Mobile app demo"></a>
<a href="https://squadsplit.github.io/iFiNeX-Demo/"><img src="iFiNeX-Demo/img/demo-guide.png" width="60%" alt="Searchable feature guide"></a>
</p>

## What is inside

- **Bill Tracker** — cards, payees, plans, reminders, who owes whom
- **Expense Tracker** — monthly, events, trips and custom types
- **Squad Split** — several squads, each with its own people, expenses and settlements
- **Budget & Salary Planner** — income, budget lines, savings goals
- **Backup & Restore** — file export/import and optional Google Drive scheduled backup
- **Android app** — same app, with alerts and in-app updates

## Run your own

The code is open for self-hosting (website on GitHub Pages, database on Supabase). See the setup guides in the open-source repository.

## What's new in v12.0 (app 5.0.0)
**Statements that say who pays whom** — every module now has its own 📊 report button (Bill Tracker, Party ledger, Squad Split, EPP & Gold plans, Shared card payments, Expense / Event / Trip trackers, Budget planner) and the Hub has the all-modules one. One simple window: **1 Duration** (Weekly · Monthly · All time · Custom) · **2 Modules** (tick boxes) · **3 Users** · **4 Report type**. *Balances only* = TOTAL TO PAY per person (Squad Split + Bill Tracker + EPP & Gold together), OWED TO YOU, Paid so far (to whom, how much, when) and a month-by-month balance (brought forward + new charges − paid = closing). *Full breakdown* adds every share, settlement, carried-forward balance, party entry, instalment, spending line and card due. Output: preview · PDF · Excel · CSV. Read-only, no database change. Supabase "disk IO budget" e-mail investigated: the database is idle (18 MB, ~1 checkpoint buffer per run); see the reference file section W.

