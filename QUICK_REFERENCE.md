# Quick Reference Guide

## Common Commands

### Development
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
```

### Database
```bash
npm run db:push      # Push schema to database (dev)
npm run db:migrate   # Create migration
npm run db:studio    # Open Prisma Studio
npx prisma db seed   # Seed database
npx prisma generate  # Generate Prisma Client
```

### Deployment
```bash
vercel               # Deploy to Vercel
vercel env pull      # Pull environment variables
vercel logs          # View deployment logs
```

## File Locations

### Configuration
- Environment: `.env`
- Database: `prisma/schema.prisma`
- Next.js: `next.config.ts`
- TypeScript: `tsconfig.json`
- Vercel: `vercel.json`

### Key Files
- Layout: `src/app/layout.tsx`
- Dashboard: `src/app/page.tsx`
- Blockchain: `src/lib/blockchain.ts`
- Metrics: `src/lib/metrics.ts`
- Database: `src/lib/prisma.ts`

## API Routes

### Public
```
GET  /api/stats                    # Chain statistics
GET  /api/projects                 # List projects
GET  /api/projects/[slug]          # Project details
GET  /api/categories               # List categories
POST /api/projects                 # Submit project
POST /api/users/register           # Register user
```

### Admin
```
GET  /api/admin/submissions        # List submissions
POST /api/admin/submissions        # Approve/reject
```

### Cron
```
GET  /api/cron/update-metrics      # Update metrics
```

## Database Queries

### View all projects
```sql
SELECT * FROM projects;
```

### Make user admin
```sql
UPDATE users SET "isAdmin" = true WHERE "walletAddress" = 'republic1...';
```

### View pending submissions
```sql
SELECT * FROM submissions WHERE status = 'pending';
```

### Check project metrics
```sql
SELECT p.name, pm.* 
FROM projects p 
JOIN project_metrics pm ON p.id = pm."projectId"
ORDER BY pm.score DESC;
```

## Environment Variables

### Required
```env
DATABASE_URL="postgresql://..."
NEXT_PUBLIC_RPC_ENDPOINT="https://rpc-t.republic.vinjan-inc.com"
NEXT_PUBLIC_CHAIN_ID="republic-1"
ADMIN_WALLETS="republic1..."
CRON_SECRET="your-secret"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

## Troubleshooting

### Build fails
```bash
rm -rf .next node_modules
npm install
npm run build
```

### Database connection issues
```bash
# Test connection
npx prisma db pull

# Reset database (WARNING: deletes data)
npx prisma migrate reset
```

### Prisma Client issues
```bash
npx prisma generate
```

### Keplr not connecting
1. Install Keplr extension
2. Refresh page
3. Check console for errors

## Quick Setup (New Machine)

```bash
# 1. Clone and install
git clone <repo-url>
cd republic-economy-tracker
npm install

# 2. Configure
cp .env.example .env
# Edit .env

# 3. Database
npm run db:push
npx prisma db seed

# 4. Run
npm run dev
```

## Useful Prisma Studio Queries

### Create Category
```
Model: Category
Action: Add record
Fields:
  name: "DeFi"
  slug: "defi"
```

### Make User Admin
```
Model: User
Action: Edit record
Fields:
  isAdmin: true
```

## Testing Cron Job

### Local
```bash
curl -H "Authorization: Bearer YOUR_CRON_SECRET" \
  http://localhost:3000/api/cron/update-metrics
```

### Production
```bash
curl -H "Authorization: Bearer YOUR_CRON_SECRET" \
  https://your-app.vercel.app/api/cron/update-metrics
```

## Common Issues & Solutions

### "Module not found"
```bash
npm install
npx prisma generate
```

### "Database connection failed"
- Check DATABASE_URL in .env
- Verify database is running
- Check SSL mode (add ?sslmode=require)

### "Keplr is not defined"
- Install Keplr extension
- Check window.keplr in console
- Refresh page

### "Unauthorized" on admin routes
- Connect wallet
- Check isAdmin in database
- Verify ADMIN_WALLETS env var

## Performance Tips

### Database
- Add indexes for frequently queried fields
- Use connection pooling
- Enable query logging in dev

### Frontend
- Use React Query for caching
- Implement pagination for large lists
- Optimize images

### API
- Add response caching
- Implement rate limiting
- Use edge functions where possible

## Monitoring

### Vercel
- Dashboard > Your Project > Logs
- Dashboard > Analytics (if enabled)
- Dashboard > Speed Insights

### Database
```bash
# Prisma Studio
npm run db:studio

# Query logs
# Enable in prisma/schema.prisma:
# log: ["query", "info", "warn", "error"]
```

## Backup & Restore

### Backup
```bash
pg_dump $DATABASE_URL > backup.sql
```

### Restore
```bash
psql $DATABASE_URL < backup.sql
```

## Git Workflow

```bash
# Create feature branch
git checkout -b feature/my-feature

# Make changes and commit
git add .
git commit -m "Add my feature"

# Push and create PR
git push origin feature/my-feature
```

## Vercel Deployment

```bash
# First time
vercel

# Subsequent deployments
git push origin main  # Auto-deploys

# Manual deployment
vercel --prod
```

## Security Checklist

- [ ] .env not committed to git
- [ ] CRON_SECRET is strong
- [ ] DATABASE_URL uses SSL
- [ ] Admin wallets are correct
- [ ] HTTPS enabled in production
- [ ] Dependencies are updated

## Resources

- [Next.js Docs](https://nextjs.org/docs)
- [Prisma Docs](https://www.prisma.io/docs)
- [Vercel Docs](https://vercel.com/docs)
- [CosmJS Docs](https://cosmos.github.io/cosmjs)
- [TailwindCSS Docs](https://tailwindcss.com/docs)

## Support

For issues:
1. Check this guide
2. Review README.md
3. Check SETUP.md
4. Review DEPLOYMENT.md
5. Check GitHub issues
