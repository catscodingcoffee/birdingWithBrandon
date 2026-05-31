# Birding with Brandon

A personal birding website for Oregon birders, built with Next.js. Combines the eBird database, live backyard detection data, and curated guides to help birders at every level.

## Features

- **Bird of the Day** — a daily rotating species pulled from the eBird taxonomy, with Wikipedia summary and photo
- **Hotspot Flashcards** — enter any location to study the birds reported at nearby eBird hotspots
- **Top Oregon Spots** — curated guide to the best birding locations across the state
- **Equipment** — binoculars, scopes, and field guides for every budget
- **Identification Tips** — visual and auditory cues for field identification
- **Recent Home Detections** — live feed of birds detected at my backyard station via BirdNET
- **Pinterest Boards** — curated birding reference boards

## Stack

- [Next.js](https://nextjs.org) (App Router)
- [Supabase](https://supabase.com) — backyard detection data
- [eBird API](https://documenter.getpostman.com/view/664302/S1ENwy59) — taxonomy and hotspot data
- Tailwind CSS

## Running Locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Requires the following environment variables:

```
EBIRD_API_KEY=
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
```
