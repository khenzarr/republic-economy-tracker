# Setup Guide - Republic Economy Tracker

Complete guide for setting up Republic Economy Tracker for local development and production deployment.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Local Development Setup](#local-development-setup)
- [Database Configuration](#database-configuration)
- [Environment Variables](#environment-variables)
- [API Endpoints](#api-endpoints)
- [Database Schema](#database-schema)
- [Cron Jobs](#cron-jobs)
- [RPC Integration](#rpc-integration)
- [Wallet Connection](#wallet-connection)
- [Production Deployment](#production-deployment)
- [Troubleshooting](#troubleshooting)

---

## Prerequisites

### Required Software

- **Node.js** 18.0 or higher ([Download](https://nodejs.org/))
- **PostgreSQL** 14 or higher ([Download](https://www.postgresql.org/download/))
- **Git** ([Download](https://git-scm.com/downloads))
- **Keplr Wallet** browser extension ([Install](https://www.keplr.app/download))

### Recommended Tools

- **VS Code** with extensions:
  - Prisma
  - ESLint
  - Prettier
  - TypeScript
- **Postman** or **Insomnia** for API testing
- **pgAdmin** or **TablePlus** for database management

---

## Local Development Setup

### 1. Clone the Repository

```bash
git clone https://github.com/khenzarr/republic-economy-tracker.git
cd republic-economy-tracker
```

### 2. Install Dependencies

```bash
npm install
```

This will install all required packages including:
- Next.js 14
- Prisma ORM
- CosmJS
- TailwindCSS
- shadcn/ui components
- TanStack Query

### 3. Set Up Environment Variables

```bash
cp .env.example .env
```

Edit `.env` with your configuration (see [Environment Variables](#environment-variables) section).

### 4. Set Up Database

```bash
# Push Prisma schema to database
npm run db:push

# Seed initial data (categories)
npm run db:seed
```

### 5. Start Development Server

```bash
npm run dev
```

The application will be available at [http://localhost:3000](http://localhost:3000)

### 6. Verify Installation

- Visit http://localhost:3000 - Dashboard should load
- Check http://localhost:3000/projects - Projects page should display
- Connect Keplr wallet - Wallet connection should work
- Check terminal for any errors

---

## Database Configuration

### PostgreSQL Setup

#### Local PostgreSQL

**macOS (Homebrew):**
```bash
brew install postgresql@14
brew services start postgresql@14
createdb republic_tracker
```

**Ubuntu/Debian:**
```bash
sudo apt update
sudo apt install postgresql postgresql-contrib
sudo systemctl start postgresql
sudo -u postgres createdb republic_tracker
```

**Windows:**
1. Download PostgreSQL installer
2. Run installer and follow prompts
3. Use pgAdmin to create database `republic_tracker`

#### Cloud PostgreSQL

**Vercel Postgres:**
```bash
vercel postgres create
```

**Supabase:**
1. Create project at [supabase.com](https://supabase.com)
2. Go to Settings > Database
3. Copy connection string

**Neon:**
1. Create project at [neon.tech](https://neon.tech)
2. Copy connection string

### Connection String Format

```
postgresql://[user]:[password]@[host]:[port]/[database]?[parameters]
```

**Example:**
```
postgresql://postgres:password@localhost:5432/republic_tracker
```

**With SSL (for cloud databases):**
```
postgresql://user:pass@host:5432/db?sslmode=require
```

### Prisma Commands

```bash
# Push schema changes (development)
npm run db:push

# Create migration (production)
npm run db:migrate

# Open Prisma Studio (database GUI)
npm run db:studio

# Seed database
npm run db:seed

# Generate Prisma Client
npx prisma generate

# Reset database (WARNING: deletes all data)
npx prisma migrate reset
```

---

## Environment Variables

### Required Variables

Create a `.env` file in the root directory:

```env
# Database Connection
DATABASE_URL="postgresql://user:password@localhost:5432/republic_tracker"

# Republic Blockchain Configuration
NEXT_PUBLIC_RPC_ENDPOINT="https://rpc-t.republic.vinjan-inc.com"
NEXT_PUBLIC_CHAIN_ID="republic-1"

# Admin Configuration
ADMIN_WALLETS="republic1abc...,republic1def..."

# Security
CRON_SECRET="your-random-secret-key-here"

# Application
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

### Variable Descriptions

| Variable | Description | Example |
|----------|-------------|---------|
| `DATABASE_URL` | PostgreSQL connection string | `postgresql://...` |
| `NEXT_PUBLIC_RPC_ENDPOINT` | Republic RPC endpoint | `https://rpc-t.republic.vinjan-inc.com` |
| `NEXT_PUBLIC_CHAIN_ID` | Blockchain chain ID | `republic-1` |
| `ADMIN_WALLETS` | Comma-separated admin wallet addresses | `republic1...` |
| `CRON_SECRET` | Secret key for cron job authentication | Random string |
| `NEXT_PUBLIC_APP_URL` | Application URL | `http://localhost:3000` |

### Generating Secrets

```bash
# Generate random secret
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### Environment-Specific Configs

**Development (`.env.local`):**
```env
DATABASE_URL="postgresql://localhost:5432/republic_tracker"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

**Production (Vercel):**
```env
DATABASE_URL="postgresql://production-host:5432/db?sslmode=require"
NEXT_PUBLIC_APP_URL="https://your-domain.vercel.app"
```

---

## API Endpoints

### Public Endpoints

#### GET `/api/stats`
Get real-time blockchain statistics

**Response:**
```json
{
  "chainId": "republic-1",
  "latestBlockHeight": 1234567,
  "totalValidators": 100,
  "bondedTokens": "1000000000",
  "totalSupply": "10000000000",
  "tx24h": 5000
}
```

#### GET `/api/projects`
List all projects with optional filtering

**Query Parameters:**
- `category` - Filter by category slug
- `sort` - Sort by `score`, `recent`, or `name`

**Response:**
```json
[
  {
    "id": "...",
    "name": "Project Name",
    "slug": "project-name",
    "description": "...",
    "category": { "name": "DeFi", "slug": "defi" },
    "metrics": {
      "score": 85.5,
      "tx24h": 1000,
      "tx7d": 7000,
      "uniqueWallets7d": 500
    }
  }
]
```

#### GET `/api/projects/[slug]`
Get project details by slug

**Response:**
```json
{
  "id": "...",
  "name": "Project Name",
  "slug": "project-name",
  "description": "...",
  "website": "https://...",
  "twitter": "https://...",
  "contractAddress": "republic1...",
  "verified": true,
  "metrics": { ... }
}
```

#### GET `/api/categories`
List all categories

**Response:**
```json
[
  { "id": "...", "name": "DeFi", "slug": "defi" },
  { "id": "...", "name": "NFT", "slug": "nft" }
]
```

#### POST `/api/projects`
Submit a new project (requires wallet)

**Request Body:**
```json
{
  "walletAddress": "republic1...",
  "name": "Project Name",
  "description": "...",
  "categoryId": "...",
  "website": "https://...",
  "twitter": "https://...",
  "contractAddress": "republic1..."
}
```

#### POST `/api/users/register`
Register a user wallet

**Request Body:**
```json
{
  "walletAddress": "republic1..."
}
```

### Admin Endpoints

#### GET `/api/admin/submissions`
List pending submissions (admin only)

**Headers:**
```
x-wallet-address: republic1...
```

#### POST `/api/admin/submissions`
Approve or reject submission (admin only)

**Request Body:**
```json
{
  "submissionId": "...",
  "action": "approve",
  "reviewNote": "Looks good!"
}
```

### Cron Endpoints

#### GET `/api/cron/update-metrics`
Update project metrics (requires secret)

**Headers:**
```
Authorization: Bearer YOUR_CRON_SECRET
```

**Response:**
```json
{
  "success": true,
  "updated": 10,
  "failed": 0,
  "results": [...]
}
```

---

## Database Schema

### Entity Relationship Diagram

```
┌─────────────┐       ┌──────────────┐       ┌─────────────┐
│    User     │       │   Project    │       │  Category   │
├─────────────┤       ├──────────────┤       ├─────────────┤
│ walletAddr* │◄──────│ ownerWallet  │──────►│ id*         │
│ isAdmin     │       │ categoryId   │       │ name        │
│ createdAt   │       │ name         │       │ slug        │
└─────────────┘       │ slug*        │       └─────────────┘
                      │ description  │
                      │ verified     │
                      └──────┬───────┘
                             │
                             │ 1:1
                             │
                      ┌──────▼───────────┐
                      │ ProjectMetrics   │
                      ├──────────────────┤
                      │ projectId*       │
                      │ tx24h            │
                      │ tx7d             │
                      │ uniqueWallets7d  │
                      │ txGrowthRate     │
                      │ score            │
                      └──────────────────┘

┌─────────────┐
│ Submission  │
├─────────────┤
│ id*         │
│ projectData │
│ status      │
│ submittedBy │──────►User
│ reviewNote  │
└─────────────┘
```

### Models

#### User
```prisma
model User {
  walletAddress String   @id
  isAdmin       Boolean  @default(false)
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt
}
```

#### Category
```prisma
model Category {
  id        String   @id @default(cuid())
  name      String   @unique
  slug      String   @unique
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

#### Project
```prisma
model Project {
  id              String   @id @default(cuid())
  name            String
  slug            String   @unique
  description     String
  categoryId      String
  website         String?
  twitter         String?
  discord         String?
  github          String?
  contractAddress String?
  ownerWallet     String
  verified        Boolean  @default(false)
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt
}
```

#### ProjectMetrics
```prisma
model ProjectMetrics {
  id              String   @id @default(cuid())
  projectId       String   @unique
  tx24h           Int      @default(0)
  tx7d            Int      @default(0)
  uniqueWallets7d Int      @default(0)
  txGrowthRate    Float    @default(0)
  score           Float    @default(0)
  updatedAt       DateTime @updatedAt
}
```

#### Submission
```prisma
model Submission {
  id          String   @id @default(cuid())
  projectData Json
  status      String   @default("pending")
  submittedBy String
  reviewNote  String?
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}
```

---

## Cron Jobs

### Metrics Update Job

**Schedule:** Every hour (0 * * * *)

**Endpoint:** `/api/cron/update-metrics`

**Function:**
1. Fetches all projects with contract addresses
2. Queries blockchain for transaction data
3. Calculates metrics (tx24h, tx7d, unique wallets, growth rate)
4. Computes project score
5. Updates database

**Scoring Algorithm:**
```typescript
score = (tx24h * 0.5) + (uniqueWallets7d * 0.3) + (txGrowthRate * 0.2)
```

### Vercel Configuration

In `vercel.json`:
```json
{
  "crons": [
    {
      "path": "/api/cron/update-metrics",
      "schedule": "0 * * * *"
    }
  ]
}
```

### Manual Trigger

```bash
curl -H "Authorization: Bearer YOUR_CRON_SECRET" \
  https://your-domain.com/api/cron/update-metrics
```

### Monitoring

Check cron job logs in Vercel Dashboard:
1. Go to your project
2. Click "Deployments"
3. Select latest deployment
4. View "Functions" tab
5. Check `/api/cron/update-metrics` logs

---

## RPC Integration

### CosmJS Setup

The application uses CosmJS to interact with the Republic blockchain.

**Connection:**
```typescript
import { StargateClient } from '@cosmjs/stargate';

const client = await StargateClient.connect(
  'https://rpc-t.republic.vinjan-inc.com'
);
```

### Available Methods

#### Get Chain Statistics
```typescript
const height = await client.getHeight();
const chainId = await client.getChainId();
```

#### Query Transactions
```typescript
const block = await client.getBlock(height);
const txs = block.txs;
```

#### Get Account Balance
```typescript
const balance = await client.getAllBalances('republic1...');
```

### Custom RPC Queries

Located in `src/lib/blockchain.ts`:

- `getChainStats()` - Fetch chain statistics
- `getTransactionsByHeight()` - Get transactions in height range
- `getContractTransactions()` - Get contract-specific transactions
- `count24hTransactions()` - Count recent transactions

### RPC Endpoint Configuration

**Testnet:**
```env
NEXT_PUBLIC_RPC_ENDPOINT="https://rpc-t.republic.vinjan-inc.com"
NEXT_PUBLIC_CHAIN_ID="republic-1"
```

**Mainnet (when available):**
```env
NEXT_PUBLIC_RPC_ENDPOINT="https://rpc.republic.vinjan-inc.com"
NEXT_PUBLIC_CHAIN_ID="republic-mainnet"
```

---

## Wallet Connection

### Keplr Integration

The application uses Keplr wallet for authentication and transactions.

### Chain Configuration

Located in `src/components/wallet-connect.tsx`:

```typescript
await window.keplr.experimentalSuggestChain({
  chainId: 'republic-1',
  chainName: 'Republic',
  rpc: 'https://rpc-t.republic.vinjan-inc.com',
  rest: 'https://api-t.republic.vinjan-inc.com',
  bip44: { coinType: 118 },
  bech32Config: {
    bech32PrefixAccAddr: 'republic',
    // ... other prefixes
  },
  currencies: [{
    coinDenom: 'REP',
    coinMinimalDenom: 'urep',
    coinDecimals: 6,
  }],
  // ... fee currencies and stake currency
});
```

### Connection Flow

1. User clicks "Connect Wallet"
2. Check if Keplr is installed
3. Suggest Republic chain to Keplr
4. Request wallet connection
5. Get wallet address
6. Register user in database

### Usage in Components

```typescript
'use client';

import { useState, useEffect } from 'react';

export function MyComponent() {
  const [address, setAddress] = useState<string | null>(null);

  useEffect(() => {
    const checkWallet = async () => {
      if (window.keplr) {
        const key = await window.keplr.getKey('republic-1');
        setAddress(key.bech32Address);
      }
    };
    checkWallet();
  }, []);

  return <div>{address || 'Not connected'}</div>;
}
```

---

## Production Deployment

### Vercel Deployment

1. **Push to GitHub:**
```bash
git push origin main
```

2. **Import to Vercel:**
   - Go to [vercel.com/new](https://vercel.com/new)
   - Import your repository
   - Configure environment variables
   - Deploy

3. **Set Environment Variables:**
   - Go to Project Settings > Environment Variables
   - Add all variables from `.env`
   - Save and redeploy

4. **Run Migrations:**
```bash
vercel env pull
npx prisma migrate deploy
npx prisma db seed
```

### Database Setup

**Vercel Postgres:**
```bash
vercel postgres create
```

**External Database:**
- Use Supabase, Neon, or Railway
- Copy connection string
- Add to Vercel environment variables

### Post-Deployment

1. Verify cron jobs are running
2. Test API endpoints
3. Connect wallet and test submissions
4. Check admin panel access
5. Monitor logs for errors

---

## Troubleshooting

### Common Issues

#### Database Connection Failed

**Error:** `Can't reach database server`

**Solutions:**
- Verify DATABASE_URL is correct
- Check database is running
- Add `?sslmode=require` for cloud databases
- Test connection: `npx prisma db pull`

#### Keplr Not Connecting

**Error:** `window.keplr is undefined`

**Solutions:**
- Install Keplr extension
- Refresh the page
- Check browser console for errors
- Try different browser

#### Build Fails

**Error:** `Type error` or `Module not found`

**Solutions:**
```bash
rm -rf .next node_modules
npm install
npx prisma generate
npm run build
```

#### Metrics Not Updating

**Error:** Cron job not running

**Solutions:**
- Verify CRON_SECRET is set
- Check Vercel cron job configuration
- Test manually with curl
- Check function logs in Vercel

### Debug Mode

Enable detailed logging:

```typescript
// prisma/schema.prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
  log      = ["query", "info", "warn", "error"]
}
```

### Getting Help

- **GitHub Issues**: [Report a bug](https://github.com/khenzarr/republic-economy-tracker/issues)
- **Discussions**: [Ask questions](https://github.com/khenzarr/republic-economy-tracker/discussions)
- **Documentation**: [Read the docs](../docs)

---

## Next Steps

- [Deploy to production](../DEPLOYMENT.md)
- [Contribute to the project](./CONTRIBUTING.md)
- [Read the manifesto](./manifesto.md)
- [View quick reference](../QUICK_REFERENCE.md)

---

<div align="center">

**[Back to README](../README.md)** • **[Contributing](./CONTRIBUTING.md)** • **[Deployment](../DEPLOYMENT.md)**

</div>
