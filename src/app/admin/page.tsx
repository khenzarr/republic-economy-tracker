'use client';

import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useState } from 'react';

export default function AdminPage() {
  const [walletAddress, setWalletAddress] = useState<string | null>(null);

  const { data: submissions, isLoading, refetch } = useQuery({
    queryKey: ['submissions', walletAddress],
    queryFn: async () => {
      if (!walletAddress) return [];
      const res = await fetch('/api/admin/submissions', {
        headers: { 'x-wallet-address': walletAddress },
      });
      if (!res.ok) throw new Error('Failed to fetch submissions');
      return res.json();
    },
    enabled: !!walletAddress,
  });

  const handleAction = async (submissionId: string, action: 'approve' | 'reject') => {
    if (!walletAddress) return;

    try {
      const res = await fetch('/api/admin/submissions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-wallet-address': walletAddress,
        },
        body: JSON.stringify({ submissionId, action }),
      });

      if (!res.ok) throw new Error('Failed to process submission');

      refetch();
    } catch (error) {
      console.error('Error processing submission:', error);
      alert('Failed to process submission');
    }
  };

  const connectWallet = async () => {
    if (!window.keplr) {
      alert('Please install Keplr extension');
      return;
    }

    try {
      const chainId = process.env.NEXT_PUBLIC_CHAIN_ID || 'republic-1';
      await window.keplr.enable(chainId);
      const key = await window.keplr.getKey(chainId);
      setWalletAddress(key.bech32Address);
    } catch (error) {
      console.error('Error connecting wallet:', error);
    }
  };

  if (!walletAddress) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-md mx-auto text-center">
          <h1 className="text-3xl font-bold mb-4">Admin Panel</h1>
          <p className="text-muted-foreground mb-6">
            Connect your wallet to access the admin panel
          </p>
          <Button onClick={connectWallet}>Connect Wallet</Button>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-muted rounded w-64 mb-8"></div>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-48 bg-muted rounded-xl"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Admin Panel</h1>
        <p className="text-muted-foreground">Review and approve project submissions</p>
      </div>

      {submissions?.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground">No pending submissions</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-6">
          {submissions?.map((submission: any) => {
            const data = submission.projectData;
            return (
              <Card key={submission.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle>{data.name}</CardTitle>
                      <CardDescription className="mt-2">{data.description}</CardDescription>
                    </div>
                    <Badge>{submission.status}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Submitted by</p>
                        <p className="font-mono">{submission.submittedBy}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Submitted at</p>
                        <p>{new Date(submission.createdAt).toLocaleDateString()}</p>
                      </div>
                    </div>

                    {data.website && (
                      <div>
                        <p className="text-muted-foreground text-sm">Website</p>
                        <a
                          href={data.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:underline"
                        >
                          {data.website}
                        </a>
                      </div>
                    )}

                    {data.contractAddress && (
                      <div>
                        <p className="text-muted-foreground text-sm">Contract Address</p>
                        <p className="font-mono text-sm">{data.contractAddress}</p>
                      </div>
                    )}

                    {submission.status === 'pending' && (
                      <div className="flex gap-4 pt-4">
                        <Button
                          onClick={() => handleAction(submission.id, 'approve')}
                          variant="default"
                        >
                          Approve
                        </Button>
                        <Button
                          onClick={() => handleAction(submission.id, 'reject')}
                          variant="destructive"
                        >
                          Reject
                        </Button>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
