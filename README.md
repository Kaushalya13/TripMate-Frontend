# 🌍 TripMate AI - Client Application

[![Next.js](https://img.shields.io/badge/Next.js-14-black?style=flat&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-18-blue?style=flat&logo=react)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=flat&logo=tailwind-css)](https://tailwindcss.com/)
[![Supabase](https://img.shields.io/badge/Supabase-Auth-3ECF8E?style=flat&logo=supabase)](https://supabase.com/)
---

## 📖 Overview
The TripMate AI client is a highly interactive, state-driven web application built with **Next.js (App Router)**. It provides a seamless, native-app-like user experience for generating personalized travel itineraries across Sri Lanka. The frontend manages complex state transitions, dynamic map rendering, and secure authentication while communicating with a FastAPI Python backend for neural network inference.

## ✨ Key Frontend Features

### 1. State-Driven Travel Wizard
* A multi-step planning interface utilizing React `useState` and Framer Motion for smooth transitions (`landing` -> `locations` -> `preferences` -> `planning` -> `selection`).
* Optimistic UI updates and intelligent form pre-filling based on natural language inputs from the Hero section.

### 2. Interactive Mapbox Integration
* Real-time geographic visualization using **Mapbox GL JS**.
* Dynamic markers and automated camera `flyTo` animations that update instantly when the AI Engine returns a ranked itinerary.
* Managed via strictly controlled React `useEffect` and `useRef` hooks to prevent hydration mismatches and infinite re-rendering loops.

### 3. Enterprise Admin Dashboard
* **Layout Pattern Architecture:** Utilizes Next.js Route Groups `(admin)` with persistent sidebars to avoid unnecessary DOM re-renders.
* **Service Layer Integration:** Data fetching is abstracted into a `locationService.ts` file, adhering to the Separation of Concerns (SoC) principle.
* **Pagination & Lazy Loading:** Offset-based pagination for managing 1,851+ Points of Interest (POIs) without degrading browser performance.

### 4. Secure Authentication
* Integrated with `@supabase/ssr` for secure Server-Side Rendering authentication.
* Custom modal capturing detailed AI preferences (Beach, Nature, History, Religious) during both manual Email/Password signups and Google OAuth flows.

---

## 🛠️ Frontend Technology Stack
* **Core Framework:** Next.js 14 (React 18)
* **Styling & Animation:** Tailwind CSS, Framer Motion
* **Mapping:** Mapbox GL JS (`mapbox-gl`)
* **Icons:** Lucide React
* **BaaS SDK:** Supabase JavaScript Client

---

## 📂 Project Structure (Clean Architecture)
```text
src/
├── app/                    # Next.js App Router
│   ├── (admin)/            # Route Group: Secure Admin Dashboard
│   ├── (auth)/             # Route Group: Authentication callbacks
│   ├── trip/               # User-facing AI Planner view
│   ├── layout.tsx          # Root layout & providers
│   └── page.tsx            # Landing page (Hero)
├── components/             # Reusable UI Components
│   ├── admin/              # Dashboard specific components (Sidebar, StatCards)
│   ├── ui/                 # Shared primitives (Buttons, Inputs, Modals)
│   └── SearchableSelect.tsx# Custom dropdown with search filter
├── lib/                    # Shared logic & configurations
│   ├── services/           # API and Database Service Layer (SoC)
│   ├── api.ts              # Fetch wrappers for Python Backend
│   └── types.ts            # Global TypeScript Interfaces
└── public/                 # Static assets (Images, Fonts)
