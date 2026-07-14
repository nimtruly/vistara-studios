# Vistara Studios

Vistara Studios is a premium media production portfolio built with Next.js. It presents studio capabilities, featured work, company information, and a structured inquiry flow for new projects.

## What The Site Does

- Showcases the studio brand with a cinematic landing page.
- Highlights featured work, services, and company background.
- Collects project inquiries through a validated booking form.
- Sends inquiries through a server-side API route powered by Resend.
- Supports polished motion, smooth scrolling, custom cursor behavior, and theme-aware styling.

## Tech Stack

- Framework: Next.js 15 with the App Router.
- Language: TypeScript.
- UI: React 19.
- Styling: Tailwind CSS 4, shadcn/ui, `clsx`, `tailwind-merge`, and `tw-animate-css`.
- Forms: React Hook Form with Zod validation.
- State and data: Zustand and TanStack React Query.
- Animation and motion: Framer Motion, GSAP, and Lenis.
- Notifications: Sonner.
- Email delivery: Resend.
- Icons and primitives: Lucide React and Base UI.

## Project Structure

- `src/app` contains the application shell, global styles, page composition, and API routes.
- `src/components` contains the page sections, form UI, shared layout elements, and UI primitives.
- `src/hooks` contains client-side data and mutation hooks.
- `src/store` contains shared client state.
- `public` contains static assets such as images and metadata files.

## Local Setup

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

Build for production:

```bash
npm run build
```

Start the production server:

```bash
npm run start
```

Lint the project:

```bash
npm run lint
```

## Environment Variables

The booking API can run in a mock mode without email delivery, but production email submission requires:

- `RESEND_API_KEY`: your Resend API key.
- `RESEND_TO_EMAIL`: destination email address for incoming inquiries.

If `RESEND_API_KEY` is not set, submissions are logged to the server console instead of being sent.

## Booking Flow

The inquiry form lives on the homepage and posts JSON to `POST /api/booking`.

Validation happens on the client with Zod and again on the server in the route handler. Successful submissions trigger a Sonner toast and reset the form. Failures return a user-facing error message.

## Styling And UX Notes

- The global theme is tuned for a high-contrast, editorial look.
- The site uses a custom Plus Jakarta Sans font loaded through `next/font`.
- Lenis is used for smooth scrolling.
- A custom cursor is enabled on pointer devices.
- The layout includes subtle noise and blur-based motion for a cinematic feel.

## Deploying

This project is ready for deployment on Vercel or any platform that supports Next.js 15. Make sure the environment variables above are configured in the target environment.

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [React Hook Form](https://react-hook-form.com/)
- [Zod](https://zod.dev/)
- [Resend](https://resend.com/)