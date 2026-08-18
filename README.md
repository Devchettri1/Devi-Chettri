# OffbeatDestination Travels — Production Travel Agency Website & CMS

> **Brand**: OffbeatDestination Travels  
> **Tagline**: "A Better Way to Explore"  
> **Govt. Reg No**: 1750/DoT&CAv/Gtk/25/TA (Govt. of Sikkim Registered Agency)  
> **Location**: Arithang, Gangtok, Sikkim - 737102  

---

## Overview

OffbeatDestination Travels is a complete, full-stack, production-ready travel agency application designed specifically for Sikkim, Darjeeling, North Sikkim, Silk Route, and Bhutan tours and cab rentals.

### Key Features
- **Interactive Circuit Maps (Google Maps JavaScript API)**: Live driving distance, estimated duration in minutes, numbered waypoints, and elevation profiles.
- **Live Waypoint Weather & Gear Advisory**: Real-time temperature (°C), conditions, wind speed, and altitude-based clothing packing guidance powered by Open-Meteo.
- **Quick Book Modal**: Seamless circuit selector, date picker, pax calculator, route visualization, price estimator, and structured WhatsApp enquiry builder.
- **Owner Admin Console (CMS & CRM)**:
  - **Dashboard**: Enquiries, Bookings, Revenue, and Today's Leads.
  - **Tour Packages CRUD**: Full manager for itineraries, pricing, inclusions, photos, and publish/unpublish toggles.
  - **Cab Rental CMS**: Fleet management for Innova Crysta, Scorpio-N, XUV700, and Tempo Travellers with per-km and destination rates.
  - **Hotels Management**: Partner hotel directory, room tiers, seasonal rate multipliers, and availability toggles.
  - **Leads / CRM**: Status tracking (New, Contacted, Quoted, Confirmed, Lost), search filters, WhatsApp actions, and CSV export.
  - **Quotation Generator**: Custom quotation builder with downloadable PDF generation via `jsPDF`.
  - **Website CMS**: Hero banner manager, media gallery, customer reviews, FAQs, and SEO meta tags.
  - **Settings**: Company credentials, WhatsApp number, Google Maps API configuration, and security settings.
- **Data Persistence**: Local JSON persistent backend storage (`/src/data/backend_store_data.json`) with full REST API endpoints.

---

## Installation

```bash
# Install all required npm dependencies
npm install
```

---

## Environment Variables

Copy `.env.example` to `.env` and configure your API credentials:

```env
# GEMINI_API_KEY: Required for AI sales engine & chat assistant
GEMINI_API_KEY="your_gemini_api_key_here"

# GOOGLE_MAPS_PLATFORM_KEY: Required for interactive Google Maps route rendering
GOOGLE_MAPS_PLATFORM_KEY="your_google_maps_api_key_here"

# ADMIN_PIN: Owner Admin Console access pin (Default: 1750)
ADMIN_PIN="1750"

# APP_URL: Production hosted URL
APP_URL="http://localhost:3000"
```

---

## Development & Production Commands

### Development Mode
Runs the Express backend server with Vite middleware on port `3000`:
```bash
npm run dev
```

### Production Build & Launch
Builds the Vite frontend bundle and compiles the Express TypeScript server into CommonJS (`dist/server.cjs`):
```bash
npm run build
npm start
```

---

## Integrations

### 1. Google Maps Platform
- Uses `@vis.gl/react-google-maps` for reactive Google Map rendering.
- Configured in `src/components/RouteMapVisualization.tsx`.
- Pass your key via `GOOGLE_MAPS_PLATFORM_KEY` in environment variables or via the Admin Settings tab.

### 2. Weather Advisory (Open-Meteo)
- Fetches real-time mountain forecasts for waypoints (Gangtok, Lachen, Lachung, Zero Point, Gurudongmar, Zuluk, etc.).
- Implements graceful fallback calculation if Open-Meteo is temporarily unreachable.

### 3. Owner Admin Console & Data Persistence
- Access the Admin Console via the top header **Owner Admin** button or by visiting `/admin`.
- Default Admin PIN: `1750`.
- Data is stored persistently in `src/data/backend_store_data.json` via Express REST API endpoints (`/api/admin/*`).

---

## Deployment Instructions

### Deploying to Cloud Run / Docker Container
1. Ensure `package.json` contains `"start": "node dist/server.cjs"`.
2. Build command: `npm run build`.
3. Set environment variable `NODE_ENV=production`.
4. Run container binding to port `3000` and host `0.0.0.0`.

---

© 2026 OffbeatDestination Travels. All rights reserved.
