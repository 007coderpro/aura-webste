# Aura VPN Website

## Project Overview
This repository contains the source code for the Aura VPN website. The project is currently in the **initialization/migration phase**, moving from a Shopify-hosted platform to a custom-built solution to gain better control over performance, SEO, and functionality.

**Current Live Site:** [auravpn.net](https://auravpn.net)

## Technology Stack
- **Framework:** Next.js 14+ (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Icons:** Lucide React
- **Package Manager:** npm

## Implemented Pages
The following pages have been implemented to match the URL structure of the original site:
- **Home:** `/` - `src/app/page.tsx`
- **Terms of Service:** `/pages/terms` - `src/app/pages/terms/page.tsx`
- **Privacy Policy:** `/pages/privacy` - `src/app/pages/privacy/page.tsx`
- **Contact:** `/pages/contact` - `src/app/pages/contact/page.tsx`

## Components
- **Navbar:** `src/components/Navbar.tsx` (Responsive, Client Component)
- **Footer:** `src/components/Footer.tsx` (Static links)

## Development Setup
1.  **Install Dependencies:**
    ```bash
    npm install
    ```
2.  **Run Development Server:**
    ```bash
    npm run dev
    ```
3.  **Build for Production:**
    ```bash
    npm run build
    ```

## Directory Structure
- `/src/app`: Application routes and pages.
- `/src/components`: Reusable UI components.
- `/public`: Static assets (images, fonts).