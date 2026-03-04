# Republic Economy Tracker

A production-ready ecosystem explorer for the Republic blockchain (Cosmos SDK-based).

## Features

- **Global Ecosystem Dashboard**: Real-time chain statistics including block height, validators, transactions, and token supply
- **Project Directory**: Browse and discover projects building on Republic
- **Blockchain Integration**: Direct RPC connection for live metrics
- **Metrics Tracking**: Automated scoring system based on transaction volume, unique wallets, and growth rate
- **Project Submission**: Community-driven project listings with admin approval workflow
- **Wallet Integration**: Keplr wallet support for authentication and submissions

## Tech Stack

- **Frontend**: Next.js 14 (App Router), TypeScript, TailwindCSS, shadcn/ui
- **Backend**: Next.js API Routes, Prisma ORM, PostgreSQL
- **Blockchain**: CosmJS for RPC interaction
- **Data Visualization**: Recharts
- **State Management**: TanStack Query
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL database
- Keplr wallet extension (for users)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd republic-economy-tracker
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```

Edit `.env` and configure:
- `DATABASE_URL`: Your PostgreSQL connection string
- `NEXT_PUBLIC_RPC_ENDPOINT`: Republic RPC endpoint (default: https://rpc-t.republic.vinjan-inc.com)
- `NEXT_PUBLIC_CHAIN_ID`: Chain ID (default: republic-1)
- `ADMIN_WALLETS`: Comma-separated list of admin wallet addresses
- `CRON_SECRET`: Secret key for securing cron endpoints

4. Set up the database:
```bash
npm run db:push
```

5. Seed initial categories (optional):
```bash
npx prisma studio
```

Create categories like:
- DeFi
- NFT
- Gaming
- Infrastructure
- DAO

### Development

Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Database Management

- **Push schema changes**: `npm run db:push`
- **Create migration**: `npm run db:migrate`
- **Open Prisma Studio**: `npm run db:studio`

## Deployment

### Vercel Deployment

1. Push your code to GitHub

2. Import project in Vercel:
   - Connect your GitHub repository
   - Configure environment variables
   - Deploy

3. Set up PostgreSQL:
   - Use Vercel Postgres, Supabase, or any PostgreSQL provider
   - Add `DATABASE_URL` to Vercel environment variables

4. Configure Cron Jobs:
   - Vercel automatically sets up cron jobs from `vercel.json`
   - The metrics update runs hourly
   - Set `CRON_SECRET` in environment variables

### Environment Variables in Vercel

Add these in your Vercel project settings:

```
DATABASE_URL=postgresql://...
NEXT_PUBLIC_RPC_ENDPOINT=https://rpc-t.republic.vinjan-inc.com
NEXT_PUBLIC_CHAIN_ID=republic-1
ADMIN_WALLETS=republic1...
CRON_SECRET=your-secret-key
NEXT_PUBLIC_APP_URL=https://your-domain.vercel.app
```

### Post-Deployment

1. Run database migrations:
```bash
npx prisma migrate deploy
```

2. Create initial categories via Prisma Studio or API

3. Set admin wallets in environment variables

4. Test the cron job:
```bash
curl -H "Authorization: Bearer YOUR_CRON_SECRET" https://your-domain.vercel.app/api/cron/update-metrics
```

## Project Structure

```
src/
├── app/
│   ├── api/              # API routes
│   │   ├── stats/        # Chain statistics
│   │   ├── projects/     # Project CRUD
│   │   ├── categories/   # Category management
│   │   ├── users/        # User registration
│   │   ├── admin/        # Admin operations
│   │   └── cron/         # Scheduled jobs
│   ├── projects/         # Project pages
│   ├── submit/           # Submission form
│   ├── admin/            # Admin panel
│   └── page.tsx          # Dashboard
├── components/
│   ├── ui/               # shadcn/ui components
│   ├── wallet-connect.tsx
│   └── stat-card.tsx
└── lib/
    ├── blockchain.ts     # CosmJS integration
    ├── metrics.ts        # Metrics calculation
    ├── prisma.ts         # Database client
    └── utils.ts          # Utilities
```

## API Endpoints

### Public Endpoints

- `GET /api/stats` - Chain statistics
- `GET /api/projects` - List projects
- `GET /api/projects/[slug]` - Project details
- `GET /api/categories` - List categories
- `POST /api/projects` - Submit project (requires wallet)
- `POST /api/users/register` - Register user

### Admin Endpoints

- `GET /api/admin/submissions` - List pending submissions
- `POST /api/admin/submissions` - Approve/reject submissions

### Cron Endpoints

- `GET /api/cron/update-metrics` - Update project metrics (requires CRON_SECRET)

## Metrics Calculation

Projects are scored based on:

- **24h Transactions** (50% weight)
- **Unique Wallets (7d)** (30% weight)
- **Transaction Growth Rate** (20% weight)

Score formula:
```
score = (tx24h * 0.5) + (uniqueWallets7d * 0.3) + (txGrowthRate * 0.2)
```

## Admin Setup

To make a wallet an admin:

1. Connect with the wallet in the app
2. Update the user in the database:
```sql
UPDATE users SET "isAdmin" = true WHERE "walletAddress" = 'republic1...';
```

Or add the wallet to `ADMIN_WALLETS` environment variable.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## License

MIT
