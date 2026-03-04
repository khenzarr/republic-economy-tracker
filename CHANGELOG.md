# Changelog

All notable changes to Republic Economy Tracker will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Planned
- Historical data tracking and charts
- Project comparison tool
- Advanced search and filtering
- Email notification system
- GraphQL API
- Mobile app

---

## [0.1.0] - 2024-03-04

### Added

#### Core Features
- Real-time blockchain statistics dashboard
- Project directory with category filtering
- Automated metrics calculation engine
- Project submission system with admin approval
- Keplr wallet integration
- Admin panel for project management

#### Blockchain Integration
- Direct RPC connection to Republic chain
- CosmJS integration for transaction parsing
- Real-time block data fetching
- Contract address tracking
- Unique wallet identification

#### Metrics System
- Automated hourly metrics updates via cron
- Smart scoring algorithm (transactions + wallets + growth)
- 24-hour transaction tracking
- 7-day transaction volume
- Growth rate calculation

#### User Interface
- Modern dark mode design
- Responsive layout for all devices
- shadcn/ui component library
- TailwindCSS styling
- Smooth animations and transitions

#### API Endpoints
- `GET /api/stats` - Chain statistics
- `GET /api/projects` - List projects
- `GET /api/projects/[slug]` - Project details
- `GET /api/categories` - List categories
- `POST /api/projects` - Submit project
- `POST /api/users/register` - Register user
- `GET /api/admin/submissions` - Admin submissions
- `POST /api/admin/submissions` - Approve/reject
- `GET /api/cron/update-metrics` - Update metrics

#### Database
- PostgreSQL with Prisma ORM
- User management system
- Category system (DeFi, NFT, Gaming, Infrastructure, DAO, Social, Tools)
- Project and metrics models
- Submission queue system

#### Documentation
- Comprehensive README
- Getting Started guide
- Setup documentation
- Deployment guide
- Contributing guidelines
- Project manifesto
- Landing page content
- Quick reference guide

#### Development
- TypeScript for type safety
- Next.js 14 with App Router
- TanStack Query for data fetching
- Vercel deployment configuration
- Environment variable templates
- Database seeding scripts

### Technical Details

#### Stack
- **Frontend**: Next.js 14, TypeScript, TailwindCSS, shadcn/ui
- **Backend**: Next.js API Routes, Prisma ORM, PostgreSQL
- **Blockchain**: CosmJS, Keplr Wallet
- **Deployment**: Vercel with Cron Jobs

#### Performance
- Server-side rendering for SEO
- Client-side caching with TanStack Query
- Optimized database queries with indexes
- Efficient RPC connection pooling

#### Security
- Wallet-based authentication
- Admin access control
- Cron job authentication
- SQL injection protection via Prisma
- Environment variable security

---

## Release Notes

### Version 0.1.0 - Initial Release

This is the first public release of Republic Economy Tracker, providing essential infrastructure for the Republic blockchain ecosystem.

**Highlights:**
- ✅ Production-ready application
- ✅ Real-time blockchain data
- ✅ Automated metrics tracking
- ✅ Community project submissions
- ✅ Open-source MIT license
- ✅ Comprehensive documentation

**What's Next:**
- Enhanced analytics and charts
- Historical data tracking
- Project comparison tools
- Mobile app development
- Community governance features

---

## Upgrade Guide

### From Development to Production

1. **Update Environment Variables:**
   ```env
   DATABASE_URL="postgresql://production-url"
   NEXT_PUBLIC_APP_URL="https://your-domain.com"
   ```

2. **Run Migrations:**
   ```bash
   npx prisma migrate deploy
   ```

3. **Seed Database:**
   ```bash
   npx prisma db seed
   ```

4. **Deploy to Vercel:**
   ```bash
   vercel --prod
   ```

---

## Breaking Changes

None yet - this is the initial release.

---

## Deprecations

None yet - this is the initial release.

---

## Contributors

Thank you to all contributors who helped make this release possible!

- [@khenzarr](https://github.com/khenzarr) - Project creator and maintainer

Want to contribute? Check out our [Contributing Guidelines](./docs/CONTRIBUTING.md)!

---

## Links

- **Repository**: https://github.com/khenzarr/republic-economy-tracker
- **Issues**: https://github.com/khenzarr/republic-economy-tracker/issues
- **Discussions**: https://github.com/khenzarr/republic-economy-tracker/discussions
- **Documentation**: [docs/](./docs)

---

[Unreleased]: https://github.com/khenzarr/republic-economy-tracker/compare/v0.1.0...HEAD
[0.1.0]: https://github.com/khenzarr/republic-economy-tracker/releases/tag/v0.1.0
