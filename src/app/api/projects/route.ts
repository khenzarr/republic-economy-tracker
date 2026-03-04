import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const category = searchParams.get('category');
    const sort = searchParams.get('sort') || 'score';

    const projects = await prisma.project.findMany({
      where: category ? { category: { slug: category } } : {},
      include: {
        category: true,
        metrics: true,
      },
      orderBy:
        sort === 'score'
          ? { metrics: { score: 'desc' } }
          : sort === 'recent'
          ? { createdAt: 'desc' }
          : { name: 'asc' },
    });

    return NextResponse.json(projects);
  } catch (error) {
    console.error('Error fetching projects:', error);
    return NextResponse.json({ error: 'Failed to fetch projects' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const { walletAddress, ...projectData } = data;

    if (!walletAddress) {
      return NextResponse.json({ error: 'Wallet address required' }, { status: 401 });
    }

    // Create submission instead of direct project
    const submission = await prisma.submission.create({
      data: {
        projectData,
        submittedBy: walletAddress,
        status: 'pending',
      },
    });

    return NextResponse.json({ submission });
  } catch (error) {
    console.error('Error creating submission:', error);
    return NextResponse.json({ error: 'Failed to create submission' }, { status: 500 });
  }
}
