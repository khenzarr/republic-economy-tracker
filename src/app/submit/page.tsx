'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

export default function SubmitPage() {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    categoryId: '',
    website: '',
    twitter: '',
    discord: '',
    github: '',
    contractAddress: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const { data: categories } = useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const res = await fetch('/api/categories');
      if (!res.ok) throw new Error('Failed to fetch categories');
      return res.json();
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage(null);

    try {
      // Get wallet address from Keplr
      if (!window.keplr) {
        throw new Error('Please connect your wallet first');
      }

      const chainId = process.env.NEXT_PUBLIC_CHAIN_ID || 'republic-1';
      const key = await window.keplr.getKey(chainId);

      const res = await fetch('/api/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          walletAddress: key.bech32Address,
        }),
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || 'Failed to submit project');
      }

      setMessage({
        type: 'success',
        text: 'Project submitted successfully! It will be reviewed by our team.',
      });

      // Reset form
      setFormData({
        name: '',
        description: '',
        categoryId: '',
        website: '',
        twitter: '',
        discord: '',
        github: '',
        contractAddress: '',
      });
    } catch (error: any) {
      setMessage({
        type: 'error',
        text: error.message || 'Failed to submit project',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Submit Your Project</h1>
        <p className="text-muted-foreground">
          Add your project to the Republic ecosystem directory
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Project Information</CardTitle>
          <CardDescription>
            Fill out the form below to submit your project for review
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">Project Name *</Label>
              <Input
                id="name"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="My Awesome Project"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description *</Label>
              <Textarea
                id="description"
                required
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Describe your project..."
                rows={4}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Category *</Label>
              <select
                id="category"
                required
                value={formData.categoryId}
                onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              >
                <option value="">Select a category</option>
                {categories?.map((cat: any) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="website">Website</Label>
              <Input
                id="website"
                type="url"
                value={formData.website}
                onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                placeholder="https://example.com"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="twitter">Twitter</Label>
                <Input
                  id="twitter"
                  type="url"
                  value={formData.twitter}
                  onChange={(e) => setFormData({ ...formData, twitter: e.target.value })}
                  placeholder="https://twitter.com/..."
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="github">GitHub</Label>
                <Input
                  id="github"
                  type="url"
                  value={formData.github}
                  onChange={(e) => setFormData({ ...formData, github: e.target.value })}
                  placeholder="https://github.com/..."
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="discord">Discord</Label>
              <Input
                id="discord"
                type="url"
                value={formData.discord}
                onChange={(e) => setFormData({ ...formData, discord: e.target.value })}
                placeholder="https://discord.gg/..."
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="contractAddress">Contract Address (Optional)</Label>
              <Input
                id="contractAddress"
                value={formData.contractAddress}
                onChange={(e) => setFormData({ ...formData, contractAddress: e.target.value })}
                placeholder="republic1..."
              />
              <p className="text-xs text-muted-foreground">
                If your project has a smart contract, provide the address for metrics tracking
              </p>
            </div>

            {message && (
              <div
                className={`p-4 rounded-md ${
                  message.type === 'success'
                    ? 'bg-green-500/10 text-green-500'
                    : 'bg-red-500/10 text-red-500'
                }`}
              >
                {message.text}
              </div>
            )}

            <Button type="submit" disabled={isSubmitting} className="w-full">
              {isSubmitting ? 'Submitting...' : 'Submit Project'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
