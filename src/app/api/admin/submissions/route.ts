import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { slugify } from '@/lib/utils';

export async function GET(request: NextRequest) {
  try {
    const walletAddress = request.headers.get('x-wallet-address');

    if (!walletAddress) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { walletAddress },
    });

    if (!user?.isAdmin) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const submissions = await prisma.submission.findMany({
      where: { status: 'pending' },
      include: { user: true },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json(submissions);
  } catch (error) {
    console.error('Error fetching submissions:', error);
    return NextResponse.json({ error: 'Failed to fetch submissions' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const walletAddress = request.headers.get('x-wallet-address');

    if (!walletAddress) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { walletAddress },
    });

    if (!user?.isAdmin) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const { submissionId, action, reviewNote } = await request.json();

    const submission = await prisma.submission.findUnique({
      where: { id: submissionId },
    });

    if (!submission) {
      return NextResponse.json({ error: 'Submission not found' }, { status: 404 });
    }

    if (action === 'approve') {
      const projectData = submission.projectData as any;
      const slug = slugify(projectData.name);

      // Create project
      const project = await prisma.project.create({
        data: {
          name: projectData.name,
          slug,
          description: projectData.description,
          categoryId: projectData.categoryId,
          website: projectData.website,
          twitter: projectData.twitter,
          discord: projectData.discord,
          github: projectData.github,
          contractAddress: projectData.contractAddress,
          ownerWallet: submission.submittedBy,
          verified: true,
        },
      });

      // Create initial metrics
      await prisma.projectMetrics.create({
        data: {
          projectId: project.id,
        },
      });

      // Update submission
      await prisma.submission.update({
        where: { id: submissionId },
        data: { status: 'approved', reviewNote },
      });

      return NextResponse.json({ project });
    } else if (action === 'reject') {
      await prisma.submission.update({
        where: { id: submissionId },
        data: { status: 'rejected', reviewNote },
      });

      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
  } catch (error) {
    console.error('Error processing submission:', error);
    return NextResponse.json({ error: 'Failed to process submission' }, { status: 500 });
  }
}
