# 🌐 Republic Economy Tracker

```
██████╗ ███████╗██████╗ ██╗   ██╗██████╗ ██╗     ██╗ ██████╗
██╔══██╗██╔════╝██╔══██╗██║   ██║██╔══██╗██║     ██║██╔════╝
██████╔╝█████╗  ██████╔╝██║   ██║██████╔╝██║     ██║██║     
██╔══██╗██╔══╝  ██╔═══╝ ██║   ██║██╔══██╗██║     ██║██║     
██║  ██║███████╗██║     ╚██████╔╝██████╔╝███████╗██║╚██████╗
╚═╝  ╚═╝╚══════╝╚═╝      ╚═════╝ ╚═════╝ ╚══════╝╚═╝ ╚═════╝
ECONOMY TRACKER - Ecosystem Explorer for Republic Blockchain
```

> **A production-ready ecosystem explorer and analytics platform for the Republic blockchain**

[![Next.js](https://img.shields.io/badge/Next.js-14-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Prisma](https://img.shields.io/badge/Prisma-5-2D3748?style=flat-square&logo=prisma)](https://www.prisma.io/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind-4-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](https://opensource.org/licenses/MIT)
[![Vercel](https://img.shields.io/badge/Deploy-Vercel-black?style=flat-square&logo=vercel)](https://vercel.com)

---

## 🎯 Mission

Empower the Republic blockchain ecosystem with transparent, real-time analytics and a comprehensive project directory. We provide builders, validators, and investors with the tools to discover, track, and contribute to the growing Republic network.

---

## 🚀 Live Demo

🔗 **[View Live Application](#)** _(Coming Soon)_

---

## 📸 Screenshots

<div align="center">

### Dashboard
![Dashboard](./public/screenshots/dashboard.png)
_Real-time blockchain statistics and ecosystem metrics_

### Project Directory
![Projects](./public/screenshots/projects.png)
_Discover and explore projects building on Republic_

### Project Analytics
![Analytics](./public/screenshots/analytics.png)
_Detailed metrics and growth tracking_

</div>

---

## 🎯 The Problem

The Republic blockchain ecosystem lacks a centralized platform for:
- **Discovery**: Finding projects building on the network
- **Transparency**: Accessing real-time on-chain metrics
- **Community**: Connecting builders, validators, and users
- **Analytics**: Understanding ecosystem growth and activity

## ✨ The Solution

Republic Economy Tracker provides:
- 📊 **Real-time Chain Analytics** - Live blockchain statistics and validator data
- 🗂️ **Project Directory** - Comprehensive catalog of ecosystem projects
- 📈 **Automated Metrics** - Smart scoring based on transaction volume and growth
- 🔐 **Wallet Integration** - Seamless Keplr wallet authentication
- 👥 **Community Submissions** - Open platform for project listings
- ⚡ **Production Ready** - Built for scale with modern Web3 stack

---

## ✨ Key Features

### 🌐 Ecosystem Dashboard
- Real-time block height and chain statistics
- Active validator count and network health
- 24-hour transaction volume tracking
- Total supply and token metrics

### 📁 Project Directory
- Browse projects by category (DeFi, NFT, Gaming, Infrastructure, DAO, Social, Tools)
- Advanced filtering and sorting capabilities
- Verified project badges
- Social links and contract addresses

### 📊 Analytics Engine
- Automated metrics calculation via hourly cron jobs
- Smart scoring algorithm (transactions + unique wallets + growth rate)
- 24h and 7-day transaction tracking
- Unique wallet identification
- Growth rate analysis

### 🔐 Wallet Integration
- Keplr wallet support
- Wallet-gated project submissions
- Admin authentication system
- Secure signature-based auth

### 👨‍💼 Admin Panel
- Review and approve project submissions
- Manage ecosystem directory
- Verify legitimate projects
- Community moderation tools

### 🔄 Blockchain Integration
- Direct RPC connection to Republic chain
- CosmJS for transaction parsing
- Real-time block data fetching
- Contract address tracking

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     Next.js 14 Frontend                      │
│  (React Server Components + Client Components + App Router) │
└─────────────────────┬───────────────────────────────────────┘
                      │
┌─────────────────────┴───────────────────────────────────────┐
│                   API Routes (Serverless)                    │
│  /api/stats  /api/projects  /api/admin  /api/cron          │
└─────────────────────┬───────────────────────────────────────┘
                      │
        ┌─────────────┼─────────────┐
        │             │             │
┌───────▼──────┐ ┌───▼────────┐ ┌─▼──────────────┐
│   Prisma ORM │ │  CosmJS    │ │ Metrics Engine │
│  (Database)  │ │ (RPC/Chain)│ │  (Scoring)     │
└───────┬──────┘ └───┬────────┘ └─┬──────────────┘
        │            │              │
┌───────▼──────┐ ┌───▼────────┐ ┌─▼──────────────┐
│  PostgreSQL  │ │ Republic   │ │ Vercel Cron    │
│   Database   │ │    RPC     │ │  (Hourly)      │
└──────────────┘ └────────────┘ └────────────────┘
```

---

## 🛠️ Tech Stack

### Frontend
- **[Next.js 14](https://nextjs.org/)** - React framework with App Router
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe development
- **[TailwindCSS](https://tailwindcss.com/)** - Utility-first CSS
- **[shadcn/ui](https://ui.shadcn.com/)** - High-quality React components
- **[TanStack Query](https://tanstack.com/query)** - Data fetching and caching
- **[Recharts](https://recharts.org/)** - Data visualization

### Backend
- **[Next.js API Routes](https://nextjs.org/docs/api-routes/introduction)** - Serverless functions
- **[Prisma ORM](https://www.prisma.io/)** - Type-safe database client
- **[PostgreSQL](https://www.postgresql.org/)** - Relational database
- **[CosmJS](https://cosmos.github.io/cosmjs)** - Cosmos blockchain library

### Blockchain
- **[CosmJS Stargate](https://cosmos.github.io/cosmjs)** - RPC client
- **[Keplr Wallet](https://www.keplr.app/)** - Cosmos wallet integration

### Deployment
- **[Vercel](https://vercel.com/)** - Hosting and serverless functions
- **[Vercel Cron](https://vercel.com/docs/cron-jobs)** - Scheduled jobs
- **[Vercel Postgres](https://vercel.com/docs/storage/vercel-postgres)** - Managed database (optional)

---

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- PostgreSQL database
- Keplr wallet extension

### Installation

```bash
# Clone the repository
git clone https://github.com/khenzarr/republic-economy-tracker.git
cd republic-economy-tracker

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your configuration

# Initialize database
npm run db:push
npm run db:seed

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the application.

### Environment Variables

Create a `.env` file in the root directory:

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/republic_tracker"

# Republic Blockchain
NEXT_PUBLIC_RPC_ENDPOINT="https://rpc-t.republic.vinjan-inc.com"
NEXT_PUBLIC_CHAIN_ID="republic-1"

# Admin Configuration
ADMIN_WALLETS="republic1..."

# Security
CRON_SECRET="your-random-secret-key"

# Application
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

---

## 📚 Documentation

- **[Getting Started](./GETTING_STARTED.md)** - Quick setup guide
- **[Setup Guide](./docs/setup.md)** - Detailed configuration
- **[Deployment Guide](./DEPLOYMENT.md)** - Production deployment
- **[Contributing](./docs/CONTRIBUTING.md)** - Contribution guidelines
- **[Landing Page Content](./docs/landing.md)** - Marketing copy
- **[Manifesto](./docs/manifesto.md)** - Vision and roadmap
- **[Quick Reference](./QUICK_REFERENCE.md)** - Command cheatsheet

---

## 🤝 Contributing

We welcome contributions from the community! Whether you're fixing bugs, adding features, or improving documentation, your help is appreciated.

### How to Contribute

1. **Fork the repository**
2. **Create a feature branch** (`git checkout -b feature/amazing-feature`)
3. **Commit your changes** (`git commit -m 'Add amazing feature'`)
4. **Push to the branch** (`git push origin feature/amazing-feature`)
5. **Open a Pull Request**

Please read our [Contributing Guidelines](./docs/CONTRIBUTING.md) for detailed information.

### Code of Conduct

We are committed to providing a welcoming and inclusive environment. Please read our [Code of Conduct](./docs/CONTRIBUTING.md#code-of-conduct) before contributing.

---

## 🗺️ Roadmap

### Phase 1: Foundation (Current)
- ✅ Core dashboard and analytics
- ✅ Project directory and submissions
- ✅ Wallet integration
- ✅ Admin panel
- ✅ Automated metrics

### Phase 2: Enhancement (Q2 2024)
- 🔄 Advanced analytics and charts
- 🔄 Historical data tracking
- 🔄 Project comparison tools
- 🔄 Email notifications
- 🔄 API rate limiting

### Phase 3: Expansion (Q3 2024)
- 📋 GraphQL API
- 📋 WebSocket real-time updates
- 📋 Mobile app (React Native)
- 📋 Browser extension
- 📋 Internationalization

### Phase 4: Ecosystem (Q4 2024)
- 📋 Token price integration
- 📋 Governance features
- 📋 Community voting
- 📋 Advanced search
- 📋 User profiles

---

## 📊 Project Status

- **Status**: Active Development
- **Version**: 0.1.0
- **Last Updated**: March 2024
- **Maintainers**: [@khenzarr](https://github.com/khenzarr)

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.

---

## 🌟 Support the Project

If you find this project useful, please consider:

- ⭐ Starring the repository
- 🐛 Reporting bugs and issues
- 💡 Suggesting new features
- 🤝 Contributing code or documentation
- 📢 Sharing with the community

---

## 📞 Contact & Community

- **GitHub**: [khenzarr/republic-economy-tracker](https://github.com/khenzarr/republic-economy-tracker)
- **Issues**: [Report a bug](https://github.com/khenzarr/republic-economy-tracker/issues)
- **Discussions**: [Join the conversation](https://github.com/khenzarr/republic-economy-tracker/discussions)
- **Twitter**: [@republic_chain](#) _(Coming Soon)_
- **Discord**: [Join our community](#) _(Coming Soon)_

---

## 🙏 Acknowledgments

Built with ❤️ for the Republic blockchain ecosystem.

Special thanks to:
- Republic blockchain team
- Cosmos SDK community
- Open-source contributors
- Early adopters and testers

---

<div align="center">

**[Documentation](./docs)** • **[Contributing](./docs/CONTRIBUTING.md)** • **[License](./LICENSE)**

Made with ⚡ by the Republic community

</div>
