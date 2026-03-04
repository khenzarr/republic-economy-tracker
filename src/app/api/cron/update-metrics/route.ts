import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { calculateProjectMetrics } from '@/lib/metrics';

export const dynamic = 'force-dynamic';
export const maxDuration = 300; // 5 minutes for Vercel

export async function GET(request: NextRequest) {
  try {
    // Verify cron secret
    const authHeader = request.headers.get('authorization');
    const cronSecret = process.env.CRON_SECRET;

    if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get all projects with contract addresses
    const projects = await prisma.project.findMany({
      where: {
        contractAddress: {
          not: null,
        },
      },
    });

    const results = [];

    for (const project of projects) {
      if (!project.contractAddress) continue;

      try {
        const metrics = await calculateProjectMetrics(project.contractAddress);

        await prisma.projectMetrics.upsert({
          where: { projectId: project.id },
          update: metrics,
          create: {
            projectId: project.id,
            ...metrics,
          },
        });

        results.push({ projectId: project.id, success: true });
      } catch (error) {
        console.error(`Error updating metrics for project ${project.id}:`, error);
        results.push({ projectId: project.id, success: false, error: String(error) });
      }
    }

    return NextResponse.json({
      success: true,
      updated: results.filter((r) => r.success).length,
      failed: results.filter((r) => !r.success).length,
      results,
    });
  } catch (error) {
    console.error('Error in cron job:', error);
    return NextResponse.json({ error: 'Failed to update metrics' }, { status: 500 });
  }
}
