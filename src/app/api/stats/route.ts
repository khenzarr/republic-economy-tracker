import { NextResponse } from 'next/server';
import { getChainStats } from '@/lib/blockchain';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const stats = await getChainStats();
    return NextResponse.json(stats);
  } catch (error) {
    console.error('Error fetching chain stats:', error);
    return NextResponse.json(
      { error: 'Failed to fetch chain stats' },
      { status: 500 }
    );
  }
}
