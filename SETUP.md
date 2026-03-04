# Setup Guide

## Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Database Setup

Create a PostgreSQL database. You can use:
- Local PostgreSQL
- [Vercel Postgres](https://vercel.com/docs/storage/vercel-postgres)
- [Supabase](https://supabase.com/)
- [Neon](https://neon.tech/)
- [Railway](https://railway.app/)

### 3. Environment Configuration

Copy the example environment file:

```bash
cp .env.example .env
```

Update `.env` with your values:

```env
# Database - Get this from your PostgreSQL provider
DATABASE_URL="postgresql://user:password@host:5432/database?schema=public"

# Republic RPC - Default is testnet
NEXT_PUBLIC_RPC_ENDPOINT="https://rpc-t.republic.vinjan-inc.com"
NEXT_PUBLIC_CHAIN_ID="republic-1"

# Admin Wallets - Your Republic wallet address
ADMIN_WALLETS="republic1your-wallet-address-here"

# Cron Secret - Generate a random string
CRON_SECRET="your-random-secret-key-here"

# App URL
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

### 4. Initialize Database

Push the Prisma schema to your database:

```bash
npm run db:push
```

Seed initial data (categories):

```bash
npx prisma db seed
```

### 5. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Database Management

### View/Edit Data

Open Prisma Studio:

```bash
npm run db:studio
```

This opens a GUI at http://localhost:5555 where you can:
- View all tables
- Add/edit/delete records
- Create initial categories
- Set admin users

### Create Migration

When you change the schema:

```bash
npm run db:migrate
```

## Making Yourself Admin

### Option 1: Via Prisma Studio

1. Run `npm run db:studio`
2. Open the `users` table
3. Find your wallet address
4. Set `isAdmin` to `true`

### Option 2: Via SQL

```sql
UPDATE users 
SET "isAdmin" = true 
WHERE "walletAddress" = 'republic1your-wallet-address';
```

### Option 3: Via Environment Variable

Add your wallet to `.env`:

```env
ADMIN_WALLETS="republic1your-wallet-address"
```

Then run the seed script:

```bash
npx prisma db seed
```

## Testing the Application

### 1. Connect Wallet

- Install [Keplr extension](https://www.keplr.app/download)
- Click "Connect Wallet" in the app
- Approve the connection

### 2. Submit a Test Project

- Go to "Submit Project"
- Fill out the form
- Submit (creates a pending submission)

### 3. Approve as Admin

- Go to `/admin`
- Connect with your admin wallet
- Approve or reject submissions

### 4. Test Metrics Update

Manually trigger the cron job:

```bash
curl -H "Authorization: Bearer your-cron-secret" http://localhost:3000/api/cron/update-metrics
```

## Deployment to Vercel

### 1. Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin <your-repo-url>
git push -u origin main
```

### 2. Import to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Import your GitHub repository
4. Configure environment variables (copy from `.env`)
5. Deploy

### 3. Set Up Database

If using Vercel Postgres:

```bash
# Install Vercel CLI
npm i -g vercel

# Link project
vercel link

# Create database
vercel postgres create

# Get connection string
vercel env pull
```

Update `DATABASE_URL` in Vercel environment variables.

### 4. Run Migrations

After deployment:

```bash
# Using Vercel CLI
vercel env pull
npx prisma migrate deploy
npx prisma db seed
```

Or use Prisma Data Platform for easier management.

### 5. Configure Cron

Vercel automatically sets up cron jobs from `vercel.json`. The metrics update runs hourly.

Make sure `CRON_SECRET` is set in Vercel environment variables.

## Troubleshooting

### Keplr Not Connecting

1. Make sure Keplr extension is installed
2. Check that the chain is added to Keplr
3. Try refreshing the page

### Database Connection Issues

1. Verify `DATABASE_URL` is correct
2. Check database is accessible from your network
3. Ensure SSL mode is correct (add `?sslmode=require` if needed)

### Metrics Not Updating

1. Check RPC endpoint is accessible
2. Verify contract addresses are correct
3. Check cron job logs in Vercel dashboard
4. Ensure `CRON_SECRET` is set

### Build Errors

1. Run `npm run build` locally first
2. Check TypeScript errors: `npx tsc --noEmit`
3. Verify all environment variables are set

## Production Checklist

- [ ] Database is set up and accessible
- [ ] All environment variables are configured
- [ ] Admin wallets are set
- [ ] Categories are seeded
- [ ] Cron secret is generated and set
- [ ] RPC endpoint is working
- [ ] SSL is enabled (Vercel does this automatically)
- [ ] Domain is configured (optional)
- [ ] Error monitoring is set up (optional: Sentry)

## Next Steps

1. Customize the UI/branding
2. Add more categories
3. Invite projects to submit
4. Set up monitoring and alerts
5. Add analytics (optional: Vercel Analytics)
6. Configure custom domain
7. Set up email notifications (optional)

## Support

For issues or questions:
- Check the [README.md](./README.md)
- Review Prisma docs: https://www.prisma.io/docs
- Review Next.js docs: https://nextjs.org/docs
- Review CosmJS docs: https://cosmos.github.io/cosmjs
