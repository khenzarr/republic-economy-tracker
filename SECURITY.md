# Security Policy

## Supported Versions

We release patches for security vulnerabilities in the following versions:

| Version | Supported          |
| ------- | ------------------ |
| 0.1.x   | :white_check_mark: |

## Reporting a Vulnerability

We take the security of Republic Economy Tracker seriously. If you believe you have found a security vulnerability, please report it to us as described below.

### Please Do Not

- **Do not** open a public GitHub issue for security vulnerabilities
- **Do not** disclose the vulnerability publicly until it has been addressed
- **Do not** exploit the vulnerability beyond what is necessary to demonstrate it

### Please Do

1. **Email us** at [security@example.com] (or create a private security advisory on GitHub)
2. **Provide details** including:
   - Description of the vulnerability
   - Steps to reproduce
   - Potential impact
   - Suggested fix (if any)
3. **Allow time** for us to respond and address the issue (typically 90 days)

### What to Expect

- **Acknowledgment**: We will acknowledge receipt of your vulnerability report within 48 hours
- **Updates**: We will provide regular updates on our progress
- **Credit**: We will credit you in the security advisory (unless you prefer to remain anonymous)
- **Fix**: We will work to fix the vulnerability as quickly as possible
- **Disclosure**: We will coordinate public disclosure with you

## Security Best Practices

### For Users

1. **Keep Dependencies Updated**: Regularly update to the latest version
2. **Secure Environment Variables**: Never commit `.env` files to version control
3. **Use Strong Secrets**: Generate strong random values for `CRON_SECRET`
4. **Database Security**: Use SSL connections for production databases
5. **Wallet Security**: Never share your private keys or seed phrases

### For Developers

1. **Code Review**: All code changes require review before merging
2. **Dependency Scanning**: Regularly scan dependencies for vulnerabilities
3. **Input Validation**: Always validate and sanitize user inputs
4. **Authentication**: Use wallet-based authentication for sensitive operations
5. **Rate Limiting**: Implement rate limiting on API endpoints
6. **Error Handling**: Don't expose sensitive information in error messages

## Known Security Considerations

### Wallet Integration

- Keplr wallet integration requires user approval for all transactions
- Private keys never leave the user's browser
- All wallet interactions are client-side only

### Database

- Prisma ORM provides SQL injection protection
- All queries are parameterized
- Database credentials stored in environment variables only

### API Security

- Admin endpoints require wallet authentication
- Cron endpoints require bearer token authentication
- Rate limiting recommended for production

### Environment Variables

Sensitive variables that should never be committed:

- `DATABASE_URL` - Database connection string
- `CRON_SECRET` - Cron job authentication secret
- `ADMIN_WALLETS` - Admin wallet addresses

## Security Updates

Security updates will be released as patch versions (e.g., 0.1.1) and announced via:

- GitHub Security Advisories
- Release notes
- CHANGELOG.md

## Vulnerability Disclosure Policy

We follow a coordinated disclosure process:

1. **Report received**: Vulnerability reported privately
2. **Validation**: We validate and assess the vulnerability
3. **Fix development**: We develop and test a fix
4. **Release**: We release a patched version
5. **Disclosure**: We publicly disclose the vulnerability (typically 90 days after fix)

## Security Hall of Fame

We recognize security researchers who responsibly disclose vulnerabilities:

- [Your name could be here!]

## Contact

For security concerns, please contact:

- **Email**: [security@example.com]
- **GitHub**: [Create a private security advisory](https://github.com/khenzarr/republic-economy-tracker/security/advisories/new)

## Additional Resources

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [Next.js Security](https://nextjs.org/docs/advanced-features/security-headers)
- [Prisma Security](https://www.prisma.io/docs/concepts/components/prisma-client/security)
- [Vercel Security](https://vercel.com/docs/security)

---

Thank you for helping keep Republic Economy Tracker and our users safe!
