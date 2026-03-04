'use client';

import { use } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { formatNumber, truncateAddress } from '@/lib/utils';
import { ExternalLink, Github, Twitter, Globe } from 'lucide-react';
import Link from 'next/link';

export default function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);

  const { data: project, isLoading } = useQuery({
    queryKey: ['project', slug],
    queryFn: async () => {
      const res = await fetch(`/api/projects/${slug}`);
      if (!res.ok) throw new Error('Failed to fetch project');
      return res.json();
    },
  });

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="h-12 bg-muted rounded w-96 mb-4"></div>
          <div className="h-6 bg-muted rounded w-64 mb-8"></div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 h-96 bg-muted rounded-xl"></div>
            <div className="h-96 bg-muted rounded-xl"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-12">
          <h1 className="text-2xl font-bold mb-2">Project Not Found</h1>
          <p className="text-muted-foreground mb-4">
            The project you're looking for doesn't exist.
          </p>
          <Link href="/projects">
            <Button>Back to Projects</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h1 className="text-4xl font-bold mb-2">{project.name}</h1>
            <div className="flex items-center gap-2">
              <Badge variant="outline">{project.category.name}</Badge>
              {project.verified && <Badge variant="secondary">Verified</Badge>}
            </div>
          </div>
        </div>
        <p className="text-lg text-muted-foreground">{project.description}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {project.metrics && (
            <Card>
              <CardHeader>
                <CardTitle>Metrics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Score</p>
                    <p className="text-2xl font-bold">{project.metrics.score.toFixed(1)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">24h Transactions</p>
                    <p className="text-2xl font-bold">{formatNumber(project.metrics.tx24h)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">7d Transactions</p>
                    <p className="text-2xl font-bold">{formatNumber(project.metrics.tx7d)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Unique Wallets (7d)</p>
                    <p className="text-2xl font-bold">
                      {formatNumber(project.metrics.uniqueWallets7d)}
                    </p>
                  </div>
                </div>
                <div className="mt-6 pt-6 border-t">
                  <p className="text-sm text-muted-foreground mb-1">Growth Rate</p>
                  <p
                    className={`text-xl font-bold ${
                      project.metrics.txGrowthRate >= 0 ? 'text-green-500' : 'text-red-500'
                    }`}
                  >
                    {project.metrics.txGrowthRate >= 0 ? '+' : ''}
                    {project.metrics.txGrowthRate.toFixed(2)}%
                  </p>
                </div>
              </CardContent>
            </Card>
          )}

          <Card>
            <CardHeader>
              <CardTitle>About</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Owner</p>
                <p className="font-mono text-sm">{truncateAddress(project.ownerWallet, 12)}</p>
              </div>
              {project.contractAddress && (
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Contract Address</p>
                  <p className="font-mono text-sm break-all">{project.contractAddress}</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Links</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {project.website && (
                <a
                  href={project.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm hover:text-primary transition-colors"
                >
                  <Globe className="h-4 w-4" />
                  Website
                  <ExternalLink className="h-3 w-3 ml-auto" />
                </a>
              )}
              {project.twitter && (
                <a
                  href={project.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm hover:text-primary transition-colors"
                >
                  <Twitter className="h-4 w-4" />
                  Twitter
                  <ExternalLink className="h-3 w-3 ml-auto" />
                </a>
              )}
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm hover:text-primary transition-colors"
                >
                  <Github className="h-4 w-4" />
                  GitHub
                  <ExternalLink className="h-3 w-3 ml-auto" />
                </a>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
