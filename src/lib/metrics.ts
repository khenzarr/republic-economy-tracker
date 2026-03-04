import { getContractTransactions, getClient } from './blockchain';

export interface ProjectMetricsData {
  tx24h: number;
  tx7d: number;
  uniqueWallets7d: number;
  txGrowthRate: number;
  score: number;
}

export async function calculateProjectMetrics(
  contractAddress: string
): Promise<ProjectMetricsData> {
  const client = await getClient();
  const currentHeight = await client.getHeight();

  // Approximate blocks per day (assuming ~6s block time)
  const blocksPerDay = Math.floor((24 * 60 * 60) / 6);
  const blocks7d = blocksPerDay * 7;

  // Get 24h data
  const start24h = currentHeight - blocksPerDay;
  const data24h = await getContractTransactions(contractAddress, start24h, currentHeight);

  // Get 7d data
  const start7d = currentHeight - blocks7d;
  const data7d = await getContractTransactions(contractAddress, start7d, currentHeight);

  // Calculate growth rate (compare last 24h to previous 24h)
  const startPrev24h = currentHeight - (blocksPerDay * 2);
  const endPrev24h = currentHeight - blocksPerDay;
  const dataPrev24h = await getContractTransactions(contractAddress, startPrev24h, endPrev24h);

  const txGrowthRate = dataPrev24h.count > 0
    ? ((data24h.count - dataPrev24h.count) / dataPrev24h.count) * 100
    : 0;

  // Calculate score
  const score = calculateScore(data24h.count, data7d.uniqueWallets.size, txGrowthRate);

  return {
    tx24h: data24h.count,
    tx7d: data7d.count,
    uniqueWallets7d: data7d.uniqueWallets.size,
    txGrowthRate,
    score,
  };
}

export function calculateScore(tx24h: number, uniqueWallets7d: number, txGrowthRate: number): number {
  // Normalize values
  const normalizedTx = Math.min(tx24h / 100, 100); // Cap at 100
  const normalizedWallets = Math.min(uniqueWallets7d / 50, 100); // Cap at 100
  const normalizedGrowth = Math.max(Math.min(txGrowthRate, 100), -100); // Cap between -100 and 100

  // Calculate weighted score
  const score = (normalizedTx * 0.5) + (normalizedWallets * 0.3) + (normalizedGrowth * 0.2);

  return Math.max(0, Math.min(100, score)); // Ensure score is between 0 and 100
}
