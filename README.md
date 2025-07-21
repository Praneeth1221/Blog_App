# BlogPub - Premium Blog Platform

A modern blog platform built with Next.js, Supabase, and Stripe that supports both free and premium content with subscription management.

## Features

- 🔐 **Authentication** - Secure user authentication with Supabase
- 📝 **Content Management** - Rich post editor with draft/published states
- 💎 **Premium Content** - Subscription-based premium articles
- 💳 **Payments** - Stripe integration for subscription management
- 👑 **Admin Panel** - Complete admin interface for content and user management
- 🎨 **Modern UI** - Beautiful, responsive design with Tailwind CSS
- 🔒 **Security** - Row Level Security (RLS) with Supabase

## Tech Stack

- **Frontend**: Next.js 15, React 18, TypeScript
- **Styling**: Tailwind CSS, shadcn/ui components
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **Payments**: Stripe
- **Deployment**: Static export ready

## Getting Started

### Prerequisites

- Node.js 18+ 
- A Supabase project
- A Stripe account

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd blogpub
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

4. Configure your environment variables in `.env.local`:

#### Supabase Setup
- Go to [Supabase](https://supabase.com) and create a new project
- Get your project URL and anon key from Settings > API
- Get your service role key (keep this secret!)

#### Stripe Setup
- Go to [Stripe](https://stripe.com) and create an account
- Get your secret key from the Stripe dashboard
- Create a subscription product and get the price ID
- Set up webhooks for subscription events

5. Run the database migrations:
- The migration file is already included in `supabase/migrations/`
- Apply it through your Supabase dashboard or CLI

6. Start the development server:
```bash
npm run dev
```

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase project URL | Yes |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Your Supabase anon key | Yes |
| `SUPABASE_SERVICE_ROLE_KEY` | Your Supabase service role key | Yes |
| `STRIPE_SECRET_KEY` | Your Stripe secret key | Yes |
| `STRIPE_PUBLISHABLE_KEY` | Your Stripe publishable key | Yes |
| `STRIPE_WEBHOOK_SECRET` | Your Stripe webhook secret | Yes |
| `STRIPE_PRICE_ID` | Your Stripe subscription price ID | Yes |
| `NEXT_PUBLIC_APP_URL` | Your app URL | Yes |

## Database Schema

The application uses the following main tables:

- **profiles** - User profiles with role management
- **posts** - Blog posts with premium/public visibility  
- **subscriptions** - User subscription tracking

## Features Overview

### User Roles
- **User**: Can read free content, subscribe for premium access
- **Admin**: Full access to admin panel, can manage all content and users

### Content Types
- **Free Posts**: Accessible to all users
- **Premium Posts**: Requires active subscription

### Admin Features
- User management with role assignment
- Content moderation and management
- Subscription overview
- Analytics dashboard

## API Routes

- `/api/create-checkout-session` - Creates Stripe checkout session
- `/api/webhooks/stripe` - Handles Stripe webhook events

## Deployment

The project is configured for static export:

```bash
npm run build
```

This generates a static site in the `out` directory that can be deployed to any static hosting service.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is licensed under the MIT License.