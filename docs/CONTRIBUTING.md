# Contributing to Republic Economy Tracker

Thank you for your interest in contributing to Republic Economy Tracker! We welcome contributions from developers of all skill levels.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [How Can I Contribute?](#how-can-i-contribute)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Coding Standards](#coding-standards)
- [Commit Guidelines](#commit-guidelines)
- [Pull Request Process](#pull-request-process)
- [Reporting Bugs](#reporting-bugs)
- [Suggesting Features](#suggesting-features)
- [Submitting Projects](#submitting-projects)

---

## Code of Conduct

### Our Pledge

We are committed to providing a welcoming and inclusive environment for all contributors, regardless of experience level, gender, gender identity and expression, sexual orientation, disability, personal appearance, body size, race, ethnicity, age, religion, or nationality.

### Our Standards

**Positive behavior includes:**

- Using welcoming and inclusive language
- Being respectful of differing viewpoints and experiences
- Gracefully accepting constructive criticism
- Focusing on what is best for the community
- Showing empathy towards other community members

**Unacceptable behavior includes:**

- Trolling, insulting/derogatory comments, and personal or political attacks
- Public or private harassment
- Publishing others' private information without explicit permission
- Other conduct which could reasonably be considered inappropriate

### Enforcement

Instances of abusive, harassing, or otherwise unacceptable behavior may be reported by opening an issue or contacting the project maintainers. All complaints will be reviewed and investigated promptly and fairly.

---

## How Can I Contribute?

### 🐛 Reporting Bugs

Found a bug? Help us improve by reporting it!

**Before submitting a bug report:**

1. Check the [existing issues](https://github.com/khenzarr/republic-economy-tracker/issues) to avoid duplicates
2. Verify the bug exists in the latest version
3. Collect relevant information (browser, OS, error messages, screenshots)

**How to submit a bug report:**

1. Go to [Issues](https://github.com/khenzarr/republic-economy-tracker/issues/new)
2. Use the bug report template
3. Provide a clear, descriptive title
4. Include steps to reproduce the bug
5. Describe expected vs. actual behavior
6. Add screenshots if applicable
7. Include environment details (browser, OS, Node version)

**Example bug report:**

```markdown
**Title**: Dashboard fails to load chain statistics

**Description**: 
When visiting the dashboard, the chain statistics cards show "Loading..." indefinitely.

**Steps to Reproduce**:
1. Navigate to http://localhost:3000
2. Observe the statistics cards
3. Wait 30+ seconds

**Expected Behavior**: 
Statistics should load within 5 seconds

**Actual Behavior**: 
Cards remain in loading state indefinitely

**Environment**:
- Browser: Chrome 120
- OS: macOS 14
- Node: 18.17.0

**Console Errors**:
```
Error: Failed to fetch chain stats
  at /api/stats:12
```

**Screenshots**: [Attach screenshot]
```

---

### 💡 Suggesting Features

Have an idea for a new feature? We'd love to hear it!

**Before suggesting a feature:**

1. Check [existing feature requests](https://github.com/khenzarr/republic-economy-tracker/issues?q=is%3Aissue+is%3Aopen+label%3Aenhancement)
2. Review the [roadmap](./manifesto.md#roadmap) to see if it's already planned
3. Consider if it aligns with the project's goals

**How to suggest a feature:**

1. Go to [Issues](https://github.com/khenzarr/republic-economy-tracker/issues/new)
2. Use the feature request template
3. Provide a clear, descriptive title
4. Explain the problem it solves
5. Describe your proposed solution
6. Include mockups or examples if applicable

**Example feature request:**

```markdown
**Title**: Add project comparison tool

**Problem**: 
Users want to compare metrics between multiple projects side-by-side.

**Proposed Solution**: 
Add a "Compare" button on project cards that allows selecting 2-4 projects for comparison. Display metrics in a table or chart format.

**Benefits**:
- Helps investors make informed decisions
- Improves user engagement
- Differentiates from other explorers

**Mockup**: [Attach design mockup]

**Additional Context**:
Similar to CoinGecko's comparison feature.
```

---

### 🚀 Submitting Projects

Want to add your project to the ecosystem directory?

**Via the Platform (Recommended):**

1. Visit [Submit Project](https://your-domain.com/submit)
2. Connect your Keplr wallet
3. Fill out the submission form
4. Wait for admin approval

**Via GitHub Issue:**

If you prefer, you can submit via GitHub:

1. Go to [Issues](https://github.com/khenzarr/republic-economy-tracker/issues/new)
2. Title: "Project Submission: [Your Project Name]"
3. Include:
   - Project name and description
   - Category (DeFi, NFT, Gaming, etc.)
   - Website URL
   - Social links (Twitter, Discord, GitHub)
   - Contract address (if applicable)
   - Your wallet address

---

## Getting Started

### Prerequisites

- Node.js 18 or higher
- PostgreSQL database
- Git
- Keplr wallet extension (for testing)

### Fork and Clone

1. **Fork the repository** on GitHub
2. **Clone your fork**:

```bash
git clone https://github.com/YOUR_USERNAME/republic-economy-tracker.git
cd republic-economy-tracker
```

3. **Add upstream remote**:

```bash
git remote add upstream https://github.com/khenzarr/republic-economy-tracker.git
```

### Install Dependencies

```bash
npm install
```

### Set Up Environment

```bash
cp .env.example .env
```

Edit `.env` with your configuration:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/republic_tracker"
NEXT_PUBLIC_RPC_ENDPOINT="https://rpc-t.republic.vinjan-inc.com"
NEXT_PUBLIC_CHAIN_ID="republic-1"
ADMIN_WALLETS="your-wallet-address"
CRON_SECRET="your-secret-key"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

### Initialize Database

```bash
npm run db:push
npm run db:seed
```

### Start Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## Development Workflow

### 1. Create a Branch

Always create a new branch for your work:

```bash
git checkout -b feature/your-feature-name
```

**Branch naming conventions:**

- `feature/` - New features (e.g., `feature/project-comparison`)
- `fix/` - Bug fixes (e.g., `fix/dashboard-loading`)
- `docs/` - Documentation updates (e.g., `docs/api-guide`)
- `refactor/` - Code refactoring (e.g., `refactor/metrics-engine`)
- `test/` - Adding tests (e.g., `test/api-routes`)

### 2. Make Changes

- Write clean, readable code
- Follow the coding standards (see below)
- Add comments for complex logic
- Update documentation if needed

### 3. Test Your Changes

```bash
# Type check
npm run type-check

# Lint
npm run lint

# Build
npm run build

# Test locally
npm run dev
```

### 4. Commit Your Changes

Follow the commit guidelines (see below):

```bash
git add .
git commit -m "feat: add project comparison tool"
```

### 5. Push to Your Fork

```bash
git push origin feature/your-feature-name
```

### 6. Create Pull Request

1. Go to your fork on GitHub
2. Click "New Pull Request"
3. Select your branch
4. Fill out the PR template
5. Submit for review

---

## Coding Standards

### TypeScript

- Use TypeScript for all new code
- Define proper types and interfaces
- Avoid `any` type unless absolutely necessary
- Use strict mode

**Example:**

```typescript
// Good
interface Project {
  id: string;
  name: string;
  slug: string;
  verified: boolean;
}

// Bad
const project: any = { ... };
```

### React Components

- Use functional components with hooks
- Keep components small and focused
- Use proper prop types
- Add JSDoc comments for complex components

**Example:**

```typescript
interface ProjectCardProps {
  project: Project;
  onSelect?: (id: string) => void;
}

/**
 * Displays a project card with metrics
 */
export function ProjectCard({ project, onSelect }: ProjectCardProps) {
  // Component logic
}
```

### File Organization

```
src/
├── app/              # Next.js pages and API routes
├── components/       # React components
│   ├── ui/          # Reusable UI components
│   └── ...          # Feature-specific components
├── lib/             # Utilities and services
│   ├── blockchain.ts
│   ├── metrics.ts
│   └── utils.ts
└── types/           # TypeScript type definitions
```

### Naming Conventions

- **Files**: `kebab-case.tsx` (e.g., `project-card.tsx`)
- **Components**: `PascalCase` (e.g., `ProjectCard`)
- **Functions**: `camelCase` (e.g., `calculateMetrics`)
- **Constants**: `UPPER_SNAKE_CASE` (e.g., `MAX_PROJECTS`)
- **Types/Interfaces**: `PascalCase` (e.g., `ProjectMetrics`)

### Code Style

- Use 2 spaces for indentation
- Use single quotes for strings
- Add trailing commas in objects/arrays
- Use semicolons
- Max line length: 100 characters

**Example:**

```typescript
const config = {
  name: 'Republic Tracker',
  version: '1.0.0',
  features: ['analytics', 'directory'],
};
```

### Comments

- Add JSDoc comments for functions and components
- Use inline comments for complex logic
- Keep comments up-to-date with code changes

**Example:**

```typescript
/**
 * Calculates project score based on metrics
 * @param tx24h - 24-hour transaction count
 * @param wallets7d - Unique wallets in 7 days
 * @param growthRate - Transaction growth rate
 * @returns Normalized score between 0-100
 */
export function calculateScore(
  tx24h: number,
  wallets7d: number,
  growthRate: number
): number {
  // Normalize values
  const normalizedTx = Math.min(tx24h / 100, 100);
  const normalizedWallets = Math.min(wallets7d / 50, 100);
  const normalizedGrowth = Math.max(Math.min(growthRate, 100), -100);

  // Calculate weighted score
  return (normalizedTx * 0.5) + (normalizedWallets * 0.3) + (normalizedGrowth * 0.2);
}
```

---

## Commit Guidelines

We follow [Conventional Commits](https://www.conventionalcommits.org/) specification.

### Commit Message Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

- `feat` - New feature
- `fix` - Bug fix
- `docs` - Documentation changes
- `style` - Code style changes (formatting, etc.)
- `refactor` - Code refactoring
- `test` - Adding or updating tests
- `chore` - Maintenance tasks

### Examples

```bash
# Feature
git commit -m "feat(projects): add project comparison tool"

# Bug fix
git commit -m "fix(dashboard): resolve loading state issue"

# Documentation
git commit -m "docs(readme): update installation instructions"

# Refactor
git commit -m "refactor(metrics): optimize calculation algorithm"

# Multiple lines
git commit -m "feat(api): add project search endpoint

- Add search by name and category
- Implement pagination
- Add rate limiting

Closes #123"
```

### Commit Message Rules

- Use present tense ("add feature" not "added feature")
- Use imperative mood ("move cursor to..." not "moves cursor to...")
- First line should be 50 characters or less
- Reference issues and PRs in the footer

---

## Pull Request Process

### Before Submitting

- [ ] Code follows the style guidelines
- [ ] Self-review of code completed
- [ ] Comments added for complex code
- [ ] Documentation updated if needed
- [ ] No console errors or warnings
- [ ] Tested locally
- [ ] Type checking passes (`npm run type-check`)
- [ ] Linting passes (`npm run lint`)
- [ ] Build succeeds (`npm run build`)

### PR Title Format

Follow the same format as commit messages:

```
feat(projects): add project comparison tool
```

### PR Description Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Changes Made
- Change 1
- Change 2
- Change 3

## Testing
How to test these changes

## Screenshots (if applicable)
[Add screenshots]

## Related Issues
Closes #123
```

### Review Process

1. **Automated Checks**: CI/CD runs automatically
2. **Code Review**: Maintainer reviews your code
3. **Feedback**: Address any requested changes
4. **Approval**: Once approved, PR will be merged
5. **Merge**: Maintainer merges your PR

### After Merge

1. Delete your branch
2. Pull latest changes from upstream
3. Celebrate! 🎉

```bash
git checkout main
git pull upstream main
git branch -d feature/your-feature-name
```

---

## Development Tips

### Database Changes

When modifying the Prisma schema:

```bash
# Push changes to database
npm run db:push

# Create migration
npm run db:migrate

# View database
npm run db:studio
```

### Testing API Routes

Use curl or Postman:

```bash
# Get chain stats
curl http://localhost:3000/api/stats

# Get projects
curl http://localhost:3000/api/projects

# Test cron job
curl -H "Authorization: Bearer your-secret" \
  http://localhost:3000/api/cron/update-metrics
```

### Debugging

- Use browser DevTools for frontend issues
- Check terminal for API errors
- Use `console.log` for debugging (remove before committing)
- Check Prisma Studio for database issues

---

## Questions?

- **GitHub Issues**: [Ask a question](https://github.com/khenzarr/republic-economy-tracker/issues/new)
- **GitHub Discussions**: [Join the conversation](https://github.com/khenzarr/republic-economy-tracker/discussions)
- **Documentation**: [Read the docs](../docs)

---

## Recognition

Contributors will be:

- Listed in the project README
- Mentioned in release notes
- Credited in the application (planned)

Thank you for contributing to Republic Economy Tracker! 🚀

---

<div align="center">

**[Back to README](../README.md)** • **[View Roadmap](./manifesto.md#roadmap)** • **[Report Bug](https://github.com/khenzarr/republic-economy-tracker/issues)**

</div>
