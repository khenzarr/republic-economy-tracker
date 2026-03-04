import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Providers } from './providers';
import { WalletConnect } from '@/components/wallet-connect';
import Link from 'next/link';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Republic Economy Tracker',
  description: 'Ecosystem explorer for the Republic blockchain',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={inter.className}>
        <Providers>
          <div className="min-h-screen bg-background">
            <header className="border-b">
              <div className="container mx-auto px-4 py-4 flex items-center justify-between">
                <div className="flex items-center gap-8">
                  <Link href="/" className="text-xl font-bold">
                    Republic Tracker
                  </Link>
                  <nav className="flex gap-6">
                    <Link href="/" className="text-sm hover:text-primary">
                      Dashboard
                    </Link>
                    <Link href="/projects" className="text-sm hover:text-primary">
                      Projects
                    </Link>
                    <Link href="/submit" className="text-sm hover:text-primary">
                      Submit Project
                    </Link>
                  </nav>
                </div>
                <WalletConnect />
              </div>
            </header>
            <main>{children}</main>
          </div>
        </Providers>
      </body>
    </html>
  );
}
