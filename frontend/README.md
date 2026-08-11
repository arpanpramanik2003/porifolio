# Portfolio Frontend — Next.js (App Router)

This is the frontend application for Arpan Pramanik's portfolio, built with **Next.js 16 (App Router)**, **React 19**, **Tailwind CSS v4**, and **Framer Motion**.

## 🛠️ Tech Stack & Architecture

- **Framework**: [Next.js (App Router)](https://nextjs.org/)
- **UI Library**: React 19
- **Styling**: Tailwind CSS v4 (`@tailwindcss/postcss`)
- **Fonts**: `next/font/google` (`Syne`, `Outfit`, `Space Grotesk`, `Plus Jakarta Sans`, `JetBrains Mono`, `Noto Sans`)
- **Animations**: Framer Motion 12
- **Smooth Scroll**: Lenis
- **Icons**: Lucide React
- **Email Service**: EmailJS

## 📁 Directory Structure

```text
frontend/
├── app/
│   ├── layout.jsx         # Root layout (fonts, metadata, JSON-LD)
│   ├── page.jsx           # Home page entrypoint
│   └── ClientAppShell.jsx # Main client application shell & theme provider
├── public/                # Static assets (images, favicons, manifest)
├── src/
│   ├── components/        # UI section components (Hero, About, Projects, etc.)
│   ├── contexts/          # React contexts (ThemeContext)
│   ├── data/              # Portfolio data modules (projects, research, etc.)
│   ├── hooks/             # Custom React hooks (useIsMobile)
│   └── index.css          # Global CSS & Tailwind v4 theme variables
├── next.config.mjs        # Next.js configuration
├── postcss.config.mjs     # PostCSS configuration for Tailwind CSS v4
└── package.json           # Dependencies and build scripts
```

## 🚀 Available Scripts

- `npm run dev` — Starts the development server at `http://localhost:3000`
- `npm run build` — Creates an optimized production build
- `npm run start` — Runs the compiled production build
- `npm run lint` — Runs Next.js ESLint checks

## 🔑 Environment Variables

Set the following in `.env`:

```env
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key
```
