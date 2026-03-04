'use client';

import { useQuery } from '@tanstack/react-query';
import { StatCard } from '@/components/stat-card';
import { Activity, Users, TrendingUp, Blocks } from 'lucide-react';
import { formatNumber, formatTokenAmount } from '@/lib/utils';

export default function HomePage() {
  const { data: stats, isLoading } = useQuery({
    queryKey: ['chain-stats'],
    queryFn: async () => {
      const res = await fetch('/api/stats');
      if (!res.ok) throw new Error('Failed to fetch stats');
      return res.json();
    },
    refetchInterval: 30000, // Refetch every 30 seconds
  });

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-muted rounded w-64 mb-8"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-32 bg-muted rounded-xl"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Republic Ecosystem Dashboard</h1>
        <p className="text-muted-foreground">
          Real-time metrics from the Republic blockchain
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <StatCard
          title="Latest Block"
          value={formatNumber(stats?.latestBlockHeight || 0)}
          icon={Blocks}
          description={`Chain ID: ${stats?.chainId || 'N/A'}`}
        />
        <StatCard
          title="Validators"
          value={stats?.totalValidators || 0}
          icon={Users}
          description="Active validators"
        />
        <StatCard
          title="24h Transactions"
          value={formatNumber(stats?.tx24h || 0)}
          icon={Activity}
          description="Last 1000 blocks"
        />
        <StatCard
          title="Total Supply"
          value={formatTokenAmount(stats?.totalSupply || '0')}
          icon={TrendingUp}
          description="REP tokens"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="border rounded-xl p-6">
          <h2 className="text-xl font-semibold mb-4">Top Projects</h2>
          <p className="text-muted-foreground text-sm">
            Explore the ecosystem in the Projects section
          </p>
        </div>
        <div className="border rounded-xl p-6">
          <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
          <p className="text-muted-foreground text-sm">
            Transaction activity across the network
          </p>
        </div>
      </div>
    </div>
  );
}
