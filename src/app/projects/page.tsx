'use client';

import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Link from 'next/link';
import { formatNumber } from '@/lib/utils';
import { TrendingUp, Users, Activity } from 'lucide-react';

export default function ProjectsPage() {
  const { data: projects, isLoading } = useQuery({
    queryKey: ['projects'],
    queryFn: async () => {
      const res = await fetch('/api/projects?sort=score');
      if (!res.ok) throw new Error('Failed to fetch projects');
      return res.json();
    },
  });

  const { data: categories } = useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const res = await fetch('/api/categories');
      if (!res.ok) throw new Error('Failed to fetch categories');
      return res.json();
    },
  });

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-muted rounded w-64 mb-8"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="h-64 bg-muted rounded-xl"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Project Directory</h1>
        <p className="text-muted-foreground">
          Discover projects building on Republic
        </p>
      </div>

      <Tabs defaultValue="all" className="mb-8">
        <TabsList>
          <TabsTrigger value="all">All Projects</TabsTrigger>
          {categories?.map((cat: any) => (
            <TabsTrigger key={cat.id} value={cat.slug}>
              {cat.name}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="all" className="mt-6">
          <ProjectGrid projects={projects || []} />
        </TabsContent>

        {categories?.map((cat: any) => (
          <TabsContent key={cat.id} value={cat.slug} className="mt-6">
            <ProjectGrid
              projects={projects?.filter((p: any) => p.category.slug === cat.slug) || []}
            />
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}

function ProjectGrid({ projects }: { projects: any[] }) {
  if (projects.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">No projects found in this category</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {projects.map((project) => (
        <Link key={project.id} href={`/projects/${project.slug}`}>
          <Card className="h-full hover:border-primary transition-colors cursor-pointer">
            <CardHeader>
              <div className="flex items-start justify-between mb-2">
                <CardTitle className="text-xl">{project.name}</CardTitle>
                {project.verified && (
                  <Badge variant="secondary" className="ml-2">
                    Verified
                  </Badge>
                )}
              </div>
              <CardDescription className="line-clamp-2">
                {project.description}
              </CardDescription>
              <Badge variant="outline" className="w-fit mt-2">
                {project.category.name}
              </Badge>
            </CardHeader>
            <CardContent>
              {project.metrics && (
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div className="flex flex-col">
                    <span className="text-muted-foreground text-xs mb-1">Score</span>
                    <div className="flex items-center gap-1">
                      <TrendingUp className="h-3 w-3" />
                      <span className="font-semibold">
                        {project.metrics.score.toFixed(1)}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-muted-foreground text-xs mb-1">24h TX</span>
                    <div className="flex items-center gap-1">
                      <Activity className="h-3 w-3" />
                      <span className="font-semibold">
                        {formatNumber(project.metrics.tx24h)}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-muted-foreground text-xs mb-1">Wallets</span>
                    <div className="flex items-center gap-1">
                      <Users className="h-3 w-3" />
                      <span className="font-semibold">
                        {formatNumber(project.metrics.uniqueWallets7d)}
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
}
