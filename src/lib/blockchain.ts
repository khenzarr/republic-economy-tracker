import { StargateClient } from '@cosmjs/stargate';
import { Tendermint37Client } from '@cosmjs/tendermint-rpc';

const RPC_ENDPOINT = process.env.NEXT_PUBLIC_RPC_ENDPOINT || 'https://rpc-t.republic.vinjan-inc.com';

export interface BlockchainStats {
  chainId: string;
  latestBlockHeight: number;
  totalValidators: number;
  bondedTokens: string;
  totalSupply: string;
  tx24h: number;
}

export interface TransactionData {
  height: number;
  hash: string;
  messages: any[];
  timestamp: Date;
}

let clientCache: StargateClient | null = null;

export async function getClient(): Promise<StargateClient> {
  if (clientCache) {
    return clientCache;
  }
  clientCache = await StargateClient.connect(RPC_ENDPOINT);
  return clientCache;
}

export async function getTendermintClient(): Promise<Tendermint37Client> {
  return await Tendermint37Client.connect(RPC_ENDPOINT);
}

export async function getChainStats(): Promise<BlockchainStats> {
  const client = await getClient();
  const tmClient = await getTendermintClient();
  
  const height = await client.getHeight();
  const chainId = await client.getChainId();
  
  // Get validators
  const validators = await tmClient.validatorsAll(height);
  
  // Get supply (simplified - actual implementation may vary)
  let totalSupply = '0';
  let bondedTokens = '0';
  
  try {
    const supplyResponse = await client.getAllBalances('republic1fl48vsnmsdzcv85q5d2q4z5ajdha8yu3h6cprl'); // Example address
    totalSupply = supplyResponse[0]?.amount || '0';
  } catch (error) {
    console.error('Error fetching supply:', error);
  }

  // Count transactions in last 24h (approximate by checking recent blocks)
  const tx24h = await count24hTransactions(tmClient, height);

  return {
    chainId,
    latestBlockHeight: height,
    totalValidators: validators.total,
    bondedTokens,
    totalSupply,
    tx24h,
  };
}

async function count24hTransactions(client: Tendermint37Client, currentHeight: number): Promise<number> {
  let count = 0;
  const blocksToCheck = 1000; // Approximate 24h worth of blocks
  
  try {
    for (let i = 0; i < blocksToCheck && currentHeight - i > 0; i++) {
      const block = await client.block(currentHeight - i);
      count += block.block.txs.length;
    }
  } catch (error) {
    console.error('Error counting transactions:', error);
  }
  
  return count;
}

export async function getTransactionsByHeight(startHeight: number, endHeight: number): Promise<TransactionData[]> {
  const tmClient = await getTendermintClient();
  const transactions: TransactionData[] = [];

  for (let height = startHeight; height <= endHeight; height++) {
    try {
      const block = await tmClient.block(height);
      
      for (const tx of block.block.txs) {
        transactions.push({
          height,
          hash: Buffer.from(tx).toString('hex'),
          messages: [], // Parse messages if needed
          timestamp: new Date(block.block.header.time.toISOString()),
        });
      }
    } catch (error) {
      console.error(`Error fetching block ${height}:`, error);
    }
  }

  return transactions;
}

export async function getContractTransactions(
  contractAddress: string,
  startHeight: number,
  endHeight: number
): Promise<{ count: number; uniqueWallets: Set<string> }> {
  const tmClient = await getTendermintClient();
  let count = 0;
  const uniqueWallets = new Set<string>();

  for (let height = startHeight; height <= endHeight; height++) {
    try {
      const block = await tmClient.block(height);
      
      for (const tx of block.block.txs) {
        const txString = Buffer.from(tx).toString('utf-8');
        
        // Simple check if contract address is in transaction
        if (txString.includes(contractAddress)) {
          count++;
          // Extract wallet addresses (simplified)
          const walletMatch = txString.match(/republic1[a-z0-9]{38}/g);
          if (walletMatch) {
            walletMatch.forEach(wallet => uniqueWallets.add(wallet));
          }
        }
      }
    } catch (error) {
      console.error(`Error processing block ${height}:`, error);
    }
  }

  return { count, uniqueWallets };
}
