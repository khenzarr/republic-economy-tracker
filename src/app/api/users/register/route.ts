import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: NextRequest) {
  try {
    const { walletAddress } = await request.json();

    if (!walletAddress || !walletAddress.startsWith('republic')) {
      return NextResponse.json({ error: 'Invalid wallet address' }, { status: 400 });
    }

    const user = await prisma.user.upsert({
      where: { walletAddress },
      update: {},
      create: { walletAddress },
    });

    return NextResponse.json({ user });
  } catch (error) {
    console.error('Error registering user:', error);
    return NextResponse.json({ error: 'Failed to register user' }, { status: 500 });
  }
}
