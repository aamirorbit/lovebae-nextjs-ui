# Lovebae Web

The official marketing website and admin dashboard for Lovebae — the app that helps couples stay connected through meaningful daily interactions.

## Overview

This Next.js application serves as:
- **Marketing Website** — Landing pages, blog, and waitlist signup
- **Creator Portal** — Application and dashboard for content creators
- **Admin Dashboard** — Manage waitlist, creators, and users

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## Environment Setup

Copy `.env.local.example` to `.env.local` and configure:

```env
# MongoDB
MONGODB_URI=your-mongodb-connection-string

# Firebase Storage
NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project-id.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project-id.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id

# Admin Auth
ADMIN_SECRET=your-admin-secret
```

## Configuration

### App Store Buttons

Configure app store links in `src/config/appStore.config.json`:
- Toggle iOS/Android visibility
- Set store URLs when apps go live
- Control "Coming Soon" states

## Project Structure

```
src/
├── app/              # Next.js App Router pages
├── components/       # React components
├── config/           # App configuration files
├── content/          # Blog MDX content
├── lib/              # Utilities and database
├── models/           # MongoDB models
└── services/         # API services
```

## Deployment

Deploy on [Vercel](https://vercel.com) for optimal Next.js performance.

```bash
npm run build
```

## Related

- [Lovebae Mobile App](../mobile) — React Native app for iOS and Android
- [Lovebae Backend](../backend) — NestJS API server
