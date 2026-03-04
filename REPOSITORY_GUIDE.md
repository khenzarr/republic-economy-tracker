# Repository Guide

Welcome to the Republic Economy Tracker repository! This guide will help you navigate the project structure and understand where to find everything.

## 📁 Repository Structure

```
republic-economy-tracker/
├── .github/                    # GitHub-specific files
│   ├── ISSUE_TEMPLATE/        # Issue templates
│   │   ├── bug_report.md
│   │   ├── feature_request.md
│   │   └── project_submission.md
│   └── pull_request_template.md
├── docs/                       # Documentation
│   ├── CONTRIBUTING.md        # Contribution guidelines
│   ├── landing.md             # Landing page content
│   ├── manifesto.md           # Vision and roadmap
│   └── setup.md               # Setup guide
├── prisma/                     # Database
│   ├── migrations/            # Database migrations
│   ├── schema.prisma          # Database schema
│   └── seed.ts                # Seed data
├── public/                     # Static assets
│   ├── screenshots/           # Application screenshots
│   └── ...                    # Other public files
├── scripts/                    # Utility scripts
│   ├── setup.sh               # Unix setup script
│   └── setup.ps1              # Windows setup script
├── src/                        # Source code
│   ├── app/                   # Next.js app directory
│   │   ├── api/              # API routes
│   │   ├── projects/         # Project pages
│   │   ├── submit/           # Submission page
│   │   ├── admin/            # Admin panel
│   │   ├── layout.tsx        # Root layout
│   │   ├── page.tsx          # Dashboard
│   │   ├── providers.tsx     # React Query provider
│   │   └── globals.css       # Global styles
│   ├── components/            # React components
│   │   ├── ui/               # UI components
│   │   └── ...               # Feature components
│   ├── lib/                   # Utilities
│   │   ├── blockchain.ts     # Blockchain integration
│   │   ├── metrics.ts        # Metrics calculation
│   │   ├── prisma.ts         # Database client
│   │   └── utils.ts          # Utility functions
│   └── types/                 # TypeScript types
├── .env.example               # Environment template
├── .gitignore                 # Git ignore rules
├── CHANGELOG.md               # Version history
├── CONTRIBUTORS.md            # Contributors list
├── DEPLOYMENT.md              # Deployment guide
├── GETTING_STARTED.md         # Quick start guide
├── LICENSE                    # MIT license
├── next.config.ts             # Next.js config
├── package.json               # Dependencies
├── PROJECT_SUMMARY.md         # Project overview
├── QUICK_REFERENCE.md         # Command reference
├── README.md                  # Main documentation
├── REPOSITORY_GUIDE.md        # This file
├── SECURITY.md                # Security policy
├── SETUP.md                   # Setup instructions
├── tsconfig.json              # TypeScript config
└── vercel.json                # Vercel config
```

## 📚 Documentation Files

### Getting Started

- **[README.md](./README.md)** - Start here! Main project documentation
- **[GETTING_STARTED.md](./GETTING_STARTED.md)** - Quick setup guide (5 minutes)
- **[docs/setup.md](./docs/setup.md)** - Detailed setup instructions

### Development

- **[docs/CONTRIBUTING.md](./docs/CONTRIBUTING.md)** - How to contribute
- **[QUICK_REFERENCE.md](./QUICK_REFERENCE.md)** - Command cheatsheet
- **[PROJECT_SUMMARY.md](./PROJECT_SUMMARY.md)** - Architecture overview

### Deployment

- **[DEPLOYMENT.md](./DEPLOYMENT.md)** - Production deployment guide
- **[SETUP.md](./SETUP.md)** - Environment configuration

### Project Information

- **[docs/manifesto.md](./docs/manifesto.md)** - Vision and roadmap
- **[docs/landing.md](./docs/landing.md)** - Marketing content
- **[CHANGELOG.md](./CHANGELOG.md)** - Version history
- **[CONTRIBUTORS.md](./CONTRIBUTORS.md)** - Contributors list

### Policies

- **[LICENSE](./LICENSE)** - MIT license
- **[SECURITY.md](./SECURITY.md)** - Security policy
- **[docs/CONTRIBUTING.md#code-of-conduct](./docs/CONTRIBUTING.md#code-of-conduct)** - Code of conduct

## 🎯 Quick Navigation

### I want to...

#### ...understand the project
→ Read [README.md](./README.md) and [docs/manifesto.md](./docs/manifesto.md)

#### ...set up locally
→ Follow [GETTING_STARTED.md](./GETTING_STARTED.md)

#### ...deploy to production
→ Follow [DEPLOYMENT.md](./DEPLOYMENT.md)

#### ...contribute code
→ Read [docs/CONTRIBUTING.md](./docs/CONTRIBUTING.md)

#### ...report a bug
→ Use [bug report template](./.github/ISSUE_TEMPLATE/bug_report.md)

#### ...suggest a feature
→ Use [feature request template](./.github/ISSUE_TEMPLATE/feature_request.md)

#### ...submit my project
→ Use [project submission template](./.github/ISSUE_TEMPLATE/project_submission.md) or visit `/submit`

#### ...find commands
→ Check [QUICK_REFERENCE.md](./QUICK_REFERENCE.md)

#### ...understand the architecture
→ Read [PROJECT_SUMMARY.md](./PROJECT_SUMMARY.md)

#### ...see the roadmap
→ Check [docs/manifesto.md#roadmap](./docs/manifesto.md#roadmap)

## 🔧 Key Files

### Configuration

- **`.env.example`** - Environment variable template
- **`next.config.ts`** - Next.js configuration
- **`tsconfig.json`** - TypeScript configuration
- **`vercel.json`** - Vercel deployment config
- **`prisma/schema.prisma`** - Database schema

### Entry Points

- **`src/app/page.tsx`** - Dashboard page
- **`src/app/layout.tsx`** - Root layout
- **`src/app/api/`** - API routes
- **`src/lib/blockchain.ts`** - Blockchain integration
- **`src/lib/metrics.ts`** - Metrics calculation

### Scripts

- **`scripts/setup.sh`** - Unix setup script
- **`scripts/setup.ps1`** - Windows setup script
- **`prisma/seed.ts`** - Database seeding

## 📖 Documentation Categories

### For Users

1. [README.md](./README.md) - Project overview
2. [docs/landing.md](./docs/landing.md) - Feature descriptions
3. [GETTING_STARTED.md](./GETTING_STARTED.md) - Quick start

### For Developers

1. [docs/CONTRIBUTING.md](./docs/CONTRIBUTING.md) - Contribution guide
2. [docs/setup.md](./docs/setup.md) - Development setup
3. [PROJECT_SUMMARY.md](./PROJECT_SUMMARY.md) - Architecture
4. [QUICK_REFERENCE.md](./QUICK_REFERENCE.md) - Commands

### For Deployers

1. [DEPLOYMENT.md](./DEPLOYMENT.md) - Deployment guide
2. [SETUP.md](./SETUP.md) - Configuration
3. [docs/setup.md](./docs/setup.md) - Environment setup

### For Contributors

1. [docs/CONTRIBUTING.md](./docs/CONTRIBUTING.md) - Guidelines
2. [docs/manifesto.md](./docs/manifesto.md) - Vision
3. [CHANGELOG.md](./CHANGELOG.md) - History
4. [CONTRIBUTORS.md](./CONTRIBUTORS.md) - Recognition

## 🎨 Branding Assets

### Screenshots

Add screenshots to `public/screenshots/`:
- `dashboard.png` - Main dashboard
- `projects.png` - Project directory
- `analytics.png` - Project details
- `submit.png` - Submission form
- `admin.png` - Admin panel

### Logo

_Logo files will be added to `public/` when available_

## 🔗 Important Links

### Repository

- **GitHub**: https://github.com/khenzarr/republic-economy-tracker
- **Issues**: https://github.com/khenzarr/republic-economy-tracker/issues
- **Discussions**: https://github.com/khenzarr/republic-economy-tracker/discussions
- **Pull Requests**: https://github.com/khenzarr/republic-economy-tracker/pulls

### External

- **Republic RPC**: https://rpc-t.republic.vinjan-inc.com
- **Keplr Wallet**: https://www.keplr.app/
- **Vercel**: https://vercel.com/

## 📝 File Naming Conventions

### Documentation

- `UPPERCASE.md` - Root-level documentation (README, LICENSE, etc.)
- `lowercase.md` - Subdirectory documentation (docs/setup.md, etc.)

### Code

- `kebab-case.tsx` - React components and pages
- `kebab-case.ts` - TypeScript files
- `PascalCase` - Component names
- `camelCase` - Function names

### Directories

- `lowercase` - All directories use lowercase
- `kebab-case` - Multi-word directories

## 🎯 Common Tasks

### Setup Development Environment

```bash
npm install
cp .env.example .env
npm run db:push
npm run db:seed
npm run dev
```

### Run Tests

```bash
npm run type-check
npm run lint
npm run build
```

### Deploy to Production

```bash
git push origin main  # Auto-deploys to Vercel
```

### Update Documentation

1. Edit relevant `.md` file
2. Commit changes
3. Push to GitHub

## 🤝 Getting Help

### Documentation

1. Check [README.md](./README.md)
2. Review [GETTING_STARTED.md](./GETTING_STARTED.md)
3. Read [docs/setup.md](./docs/setup.md)
4. Check [QUICK_REFERENCE.md](./QUICK_REFERENCE.md)

### Community

1. Search [existing issues](https://github.com/khenzarr/republic-economy-tracker/issues)
2. Ask in [discussions](https://github.com/khenzarr/republic-economy-tracker/discussions)
3. Create a [new issue](https://github.com/khenzarr/republic-economy-tracker/issues/new)

## 📊 Project Status

- **Version**: 0.1.0
- **Status**: Active Development
- **License**: MIT
- **Last Updated**: March 2024

## 🎉 Next Steps

1. ⭐ Star the repository
2. 📖 Read the [README](./README.md)
3. 🚀 Follow [GETTING_STARTED](./GETTING_STARTED.md)
4. 🤝 Check [CONTRIBUTING](./docs/CONTRIBUTING.md)
5. 💬 Join [discussions](https://github.com/khenzarr/republic-economy-tracker/discussions)

---

<div align="center">

**[Back to README](./README.md)** • **[Contributing](./docs/CONTRIBUTING.md)** • **[License](./LICENSE)**

Built with ⚡ for the Republic blockchain ecosystem

</div>
