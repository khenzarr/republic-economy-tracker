# Deployment Guide

## Vercel Deployment (Recommended)

### Prerequisites

- GitHub account
- Vercel account (free tier works)
- PostgreSQL database

### Step-by-Step Deployment

#### 1. Prepare Your Repository

```bash
# Initialize git if not already done
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit: Republic Economy Tracker"

# Create GitHub repository and push
git remote add origin https://github.com/yourusername/republic-economy-tracker.git
git branch -M main
git push -u origin main
```

#### 2. Set Up Database

Choose one of these options:

**Option A: Vercel Postgres (Easiest)**

1. Install Vercel CLI: `npm i -g vercel`
2. Login: `vercel login`
3. Link project: `vercel link`
4. Create database: `vercel postgres create`
5. Connect: `vercel postgres connect`

**Option B: Supabase (Free tier available)**

1. Go to [supabase.com](https://supabase.com)
2. Create new project
3. Go to Settings > Database
4. Copy connection string (use "Connection pooling" for production)

**Option C: Neon (Generous free tier)**

1. Go to [neon.tech](https://neon.tech)
2. Create new project
3. Copy connection string

#### 3. Deploy to Vercel

1. Go to [vercel.com/new](https://vercel.com/new)
2. Import your GitHub repository
3. Configure project:
   - Framework Preset: Next.js
   - Root Directory: `./` (or `republic-economy-tracker` if in subdirectory)
   - Build Command: `npm run build` (default)
   - Output Directory: `.next` (default)

4. Add Environment Variables:

```env
DATABASE_URL=postgresql://user:password@host:5432/database?sslmode=require
NEXT_PUBLIC_RPC_ENDPOINT=https://rpc-t.republic.vinjan-inc.com
NEXT_PUBLIC_CHAIN_ID=republic-1
ADMIN_WALLETS=republic1your-wallet-address
CRON_SECRET=generate-a-random-secret-key
NEXT_PUBLIC_APP_URL=https://your-project.vercel.app
```

5. Click "Deploy"

#### 4. Post-Deployment Setup

After successful deployment:

```bash
# Pull environment variables
vercel env pull

# Run migrations
npx prisma migrate deploy

# Seed database
npx prisma db seed
```

Or use Prisma Studio:

```bash
npx prisma studio
```

Then manually create categories and set admin users.

#### 5. Verify Deployment

1. Visit your deployed URL
2. Check that the dashboard loads
3. Connect Keplr wallet
4. Test project submission
5. Test admin panel (if you're an admin)

#### 6. Set Up Cron Job

Vercel automatically configures cron jobs from `vercel.json`. Verify:

1. Go to Vercel Dashboard > Your Project > Settings > Cron Jobs
2. You should see: `/api/cron/update-metrics` running hourly
3. Test manually:

```bash
curl -H "Authorization: Bearer YOUR_CRON_SECRET" \
  https://your-project.vercel.app/api/cron/update-metrics
```

### Environment Variables Reference

| Variable | Required | Description | Example |
|----------|----------|-------------|---------|
| `DATABASE_URL` | Yes | PostgreSQL connection string | `postgresql://...` |
| `NEXT_PUBLIC_RPC_ENDPOINT` | Yes | Republic RPC endpoint | `https://rpc-t.republic.vinjan-inc.com` |
| `NEXT_PUBLIC_CHAIN_ID` | Yes | Chain ID | `republic-1` |
| `ADMIN_WALLETS` | Yes | Comma-separated admin addresses | `republic1abc...,republic1def...` |
| `CRON_SECRET` | Yes | Secret for cron authentication | Random string |
| `NEXT_PUBLIC_APP_URL` | Yes | Your app URL | `https://your-app.vercel.app` |

### Updating Your Deployment

```bash
# Make changes
git add .
git commit -m "Your changes"
git push

# Vercel automatically redeploys
```

### Custom Domain (Optional)

1. Go to Vercel Dashboard > Your Project > Settings > Domains
2. Add your domain
3. Configure DNS records as instructed
4. Update `NEXT_PUBLIC_APP_URL` environment variable

---

## Alternative: Railway Deployment

### 1. Prepare Repository

Same as Vercel (push to GitHub)

### 2. Deploy to Railway

1. Go to [railway.app](https://railway.app)
2. Click "New Project"
3. Select "Deploy from GitHub repo"
4. Choose your repository
5. Add PostgreSQL database:
   - Click "New"
   - Select "Database"
   - Choose "PostgreSQL"
6. Connect database to your app:
   - Railway automatically sets `DATABASE_URL`

### 3. Configure Environment Variables

In Railway dashboard, add:

```env
NEXT_PUBLIC_RPC_ENDPOINT=https://rpc-t.republic.vinjan-inc.com
NEXT_PUBLIC_CHAIN_ID=republic-1
ADMIN_WALLETS=republic1your-wallet-address
CRON_SECRET=your-secret-key
NEXT_PUBLIC_APP_URL=https://your-app.railway.app
```

### 4. Set Up Cron

Railway doesn't have built-in cron. Use external service:

**Option A: Cron-job.org**

1. Go to [cron-job.org](https://cron-job.org)
2. Create account
3. Add new cron job:
   - URL: `https://your-app.railway.app/api/cron/update-metrics`
   - Schedule: Every hour
   - Headers: `Authorization: Bearer YOUR_CRON_SECRET`

**Option B: GitHub Actions**

Create `.github/workflows/cron.yml`:

```yaml
name: Update Metrics
on:
  schedule:
    - cron: '0 * * * *'  # Every hour
  workflow_dispatch:

jobs:
  update:
    runs-on: ubuntu-latest
    steps:
      - name: Trigger metrics update
        run: |
          curl -X GET \
            -H "Authorization: Bearer ${{ secrets.CRON_SECRET }}" \
            https://your-app.railway.app/api/cron/update-metrics
```

Add `CRON_SECRET` to GitHub repository secrets.

---

## Alternative: Self-Hosted (VPS)

### Prerequisites

- VPS (Ubuntu 22.04 recommended)
- Domain name (optional)
- Node.js 18+
- PostgreSQL
- Nginx (for reverse proxy)

### 1. Set Up Server

```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs

# Install PostgreSQL
sudo apt install -y postgresql postgresql-contrib

# Install Nginx
sudo apt install -y nginx

# Install PM2 (process manager)
sudo npm install -g pm2
```

### 2. Set Up Database

```bash
# Create database
sudo -u postgres psql
CREATE DATABASE republic_tracker;
CREATE USER republic_user WITH PASSWORD 'your_password';
GRANT ALL PRIVILEGES ON DATABASE republic_tracker TO republic_user;
\q
```

### 3. Deploy Application

```bash
# Clone repository
git clone https://github.com/yourusername/republic-economy-tracker.git
cd republic-economy-tracker

# Install dependencies
npm install

# Create .env file
nano .env
# Add your environment variables

# Build application
npm run build

# Run migrations
npx prisma migrate deploy
npx prisma db seed

# Start with PM2
pm2 start npm --name "republic-tracker" -- start
pm2 save
pm2 startup
```

### 4. Configure Nginx

```bash
sudo nano /etc/nginx/sites-available/republic-tracker
```

Add:

```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Enable site:

```bash
sudo ln -s /etc/nginx/sites-available/republic-tracker /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

### 5. Set Up SSL (Optional but Recommended)

```bash
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d your-domain.com
```

### 6. Set Up Cron

```bash
crontab -e
```

Add:

```cron
0 * * * * curl -H "Authorization: Bearer YOUR_CRON_SECRET" http://localhost:3000/api/cron/update-metrics
```

---

## Monitoring & Maintenance

### Vercel

- View logs: Vercel Dashboard > Your Project > Logs
- Monitor performance: Vercel Analytics (optional)
- Set up alerts: Vercel Dashboard > Settings > Notifications

### Railway

- View logs: Railway Dashboard > Your Project > Deployments
- Monitor resources: Railway Dashboard > Metrics

### Self-Hosted

```bash
# View PM2 logs
pm2 logs republic-tracker

# Monitor resources
pm2 monit

# Restart application
pm2 restart republic-tracker

# View Nginx logs
sudo tail -f /var/log/nginx/access.log
sudo tail -f /var/log/nginx/error.log
```

---

## Troubleshooting

### Build Fails

1. Check Node.js version: `node -v` (should be 18+)
2. Clear cache: `rm -rf .next node_modules && npm install`
3. Check TypeScript errors: `npx tsc --noEmit`

### Database Connection Issues

1. Verify `DATABASE_URL` format
2. Check SSL mode (add `?sslmode=require` for cloud databases)
3. Test connection: `npx prisma db pull`

### Cron Not Running

1. Verify `CRON_SECRET` is set
2. Check cron job configuration
3. Test manually with curl
4. Check application logs

### Performance Issues

1. Enable database connection pooling
2. Add Redis for caching (optional)
3. Optimize database queries
4. Use CDN for static assets

---

## Security Checklist

- [ ] Environment variables are set and secure
- [ ] `CRON_SECRET` is strong and random
- [ ] Database uses SSL connection
- [ ] Admin wallets are correctly configured
- [ ] HTTPS is enabled (SSL certificate)
- [ ] Rate limiting is configured (optional)
- [ ] CORS is properly configured
- [ ] Dependencies are up to date

---

## Backup Strategy

### Database Backups

**Vercel Postgres:**
- Automatic backups included
- Manual backup: `pg_dump` via connection string

**Supabase:**
- Automatic daily backups
- Manual backup via dashboard

**Self-Hosted:**

```bash
# Create backup
pg_dump -U republic_user republic_tracker > backup_$(date +%Y%m%d).sql

# Restore backup
psql -U republic_user republic_tracker < backup_20240101.sql

# Automate with cron
0 2 * * * pg_dump -U republic_user republic_tracker > /backups/backup_$(date +\%Y\%m\%d).sql
```

---

## Scaling Considerations

As your application grows:

1. **Database**: Upgrade to larger instance or use read replicas
2. **Caching**: Add Redis for frequently accessed data
3. **CDN**: Use Vercel Edge Network or Cloudflare
4. **Monitoring**: Add Sentry for error tracking
5. **Analytics**: Add Vercel Analytics or Plausible
6. **Load Balancing**: Use multiple instances (Vercel does this automatically)

---

## Support Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
- [Next.js Documentation](https://nextjs.org/docs)
- [CosmJS Documentation](https://cosmos.github.io/cosmjs)
