# Getting Started with Republic Economy Tracker

Welcome! This guide will get you up and running in 5 minutes.

## Prerequisites

- Node.js 18 or higher
- PostgreSQL database (local or cloud)
- Keplr wallet extension (for testing)

## Step 1: Install Dependencies

```bash
npm install
```

## Step 2: Set Up Environment

Copy the example environment file:

```bash
cp .env.example .env
```

Edit `.env` and update these values:

```env
# Your PostgreSQL connection string
DATABASE_URL="postgresql://user:password@localhost:5432/republic_tracker"

# Republic blockchain RPC (default is fine for testing)
NEXT_PUBLIC_RPC_ENDPOINT="https://rpc-t.republic.vinjan-inc.com"
NEXT_PUBLIC_CHAIN_ID="republic-1"

# Your wallet address (you'll get this after connecting Keplr)
ADMIN_WALLETS="republic1..."

# Generate a random secret for cron jobs
CRON_SECRET="your-random-secret-key"

# Your app URL
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

## Step 3: Set Up Database

Run the setup command:

```bash
npm run setup
```

This will:
- Push the database schema
- Seed initial categories
- Create admin user (if ADMIN_WALLETS is set)

Or run manually:

```bash
npm run db:push
npm run db:seed
```

## Step 4: Start Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Step 5: Connect Your Wallet

1. Install [Keplr extension](https://www.keplr.app/download)
2. Click "Connect Wallet" in the app
3. Approve the connection
4. Your wallet address will appear

## Step 6: Make Yourself Admin

### Option 1: Via Prisma Studio

```bash
npm run db:studio
```

1. Open http://localhost:5555
2. Go to `users` table
3. Find your wallet address
4. Set `isAdmin` to `true`
5. Save

### Option 2: Update .env

Add your wallet address to `.env`:

```env
ADMIN_WALLETS="republic1your-wallet-address-here"
```

Then re-run seed:

```bash
npm run db:seed
```

## Step 7: Test the Application

### Test Dashboard
- Visit http://localhost:3000
- You should see chain statistics

### Test Project Submission
1. Go to "Submit Project"
2. Fill out the form
3. Submit (creates pending submission)

### Test Admin Panel
1. Go to http://localhost:3000/admin
2. Connect with your admin wallet
3. You should see pending submissions
4. Approve or reject them

### Test Metrics Update
```bash
curl -H "Authorization: Bearer your-cron-secret" \
  http://localhost:3000/api/cron/update-metrics
```

## What's Next?

### For Development
- Customize the UI in `src/app/`
- Add more categories via Prisma Studio
- Modify blockchain logic in `src/lib/blockchain.ts`
- Adjust metrics calculation in `src/lib/metrics.ts`

### For Production
- Read [DEPLOYMENT.md](./DEPLOYMENT.md) for deployment instructions
- Set up a production database
- Configure environment variables
- Deploy to Vercel

## Project Structure

```
src/
├── app/              # Pages and API routes
│   ├── api/         # Backend API
│   ├── projects/    # Project pages
│   ├── submit/      # Submission form
│   └── admin/       # Admin panel
├── components/       # React components
├── lib/             # Utilities and services
└── types/           # TypeScript types
```

## Common Commands

```bash
npm run dev          # Start development
npm run build        # Build for production
npm run start        # Start production server
npm run db:studio    # Open database GUI
npm run db:push      # Update database schema
npm run db:seed      # Seed initial data
npm run setup        # Full setup (install + db + seed)
```

## Troubleshooting

### "Cannot connect to database"
- Check DATABASE_URL in .env
- Ensure PostgreSQL is running
- Try adding `?sslmode=require` to connection string

### "Keplr is not defined"
- Install Keplr extension
- Refresh the page
- Check browser console for errors

### "Unauthorized" in admin panel
- Make sure you're an admin (check database)
- Connect with the correct wallet
- Verify ADMIN_WALLETS in .env

### Build errors
```bash
rm -rf .next node_modules
npm install
npm run build
```

## Need Help?

- Check [README.md](./README.md) for full documentation
- Review [SETUP.md](./SETUP.md) for detailed setup
- See [QUICK_REFERENCE.md](./QUICK_REFERENCE.md) for commands
- Read [DEPLOYMENT.md](./DEPLOYMENT.md) for deployment

## Ready to Deploy?

When you're ready to go live:

1. Read [DEPLOYMENT.md](./DEPLOYMENT.md)
2. Set up production database
3. Deploy to Vercel
4. Configure environment variables
5. Run migrations
6. Test everything

## Support

For issues or questions:
- Review the documentation files
- Check the code comments
- Test with the example data

---

**You're all set!** Start building on the Republic blockchain ecosystem. 🚀
