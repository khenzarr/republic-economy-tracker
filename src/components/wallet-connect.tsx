'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { truncateAddress } from '@/lib/utils';

declare global {
  interface Window {
    keplr?: any;
  }
}

export function WalletConnect() {
  const [address, setAddress] = useState<string | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);

  useEffect(() => {
    checkConnection();
  }, []);

  const checkConnection = async () => {
    if (!window.keplr) return;

    try {
      const chainId = process.env.NEXT_PUBLIC_CHAIN_ID || 'republic-1';
      const key = await window.keplr.getKey(chainId);
      setAddress(key.bech32Address);
    } catch (error) {
      console.error('Error checking connection:', error);
    }
  };

  const connectWallet = async () => {
    if (!window.keplr) {
      alert('Please install Keplr extension');
      window.open('https://www.keplr.app/download', '_blank');
      return;
    }

    setIsConnecting(true);

    try {
      const chainId = process.env.NEXT_PUBLIC_CHAIN_ID || 'republic-1';
      const rpcEndpoint = process.env.NEXT_PUBLIC_RPC_ENDPOINT || 'https://rpc-t.republic.vinjan-inc.com';

      // Suggest chain to Keplr
      await window.keplr.experimentalSuggestChain({
        chainId,
        chainName: 'Republic',
        rpc: rpcEndpoint,
        rest: rpcEndpoint.replace('rpc', 'api'),
        bip44: {
          coinType: 118,
        },
        bech32Config: {
          bech32PrefixAccAddr: 'republic',
          bech32PrefixAccPub: 'republicpub',
          bech32PrefixValAddr: 'republicvaloper',
          bech32PrefixValPub: 'republicvaloperpub',
          bech32PrefixConsAddr: 'republicvalcons',
          bech32PrefixConsPub: 'republicvalconspub',
        },
        currencies: [
          {
            coinDenom: 'REP',
            coinMinimalDenom: 'urep',
            coinDecimals: 6,
          },
        ],
        feeCurrencies: [
          {
            coinDenom: 'REP',
            coinMinimalDenom: 'urep',
            coinDecimals: 6,
            gasPriceStep: {
              low: 0.01,
              average: 0.025,
              high: 0.04,
            },
          },
        ],
        stakeCurrency: {
          coinDenom: 'REP',
          coinMinimalDenom: 'urep',
          coinDecimals: 6,
        },
      });

      await window.keplr.enable(chainId);
      const key = await window.keplr.getKey(chainId);
      setAddress(key.bech32Address);

      // Register user in database
      await fetch('/api/users/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ walletAddress: key.bech32Address }),
      });
    } catch (error) {
      console.error('Error connecting wallet:', error);
      alert('Failed to connect wallet');
    } finally {
      setIsConnecting(false);
    }
  };

  const disconnectWallet = () => {
    setAddress(null);
  };

  if (address) {
    return (
      <Button variant="outline" onClick={disconnectWallet}>
        {truncateAddress(address)}
      </Button>
    );
  }

  return (
    <Button onClick={connectWallet} disabled={isConnecting}>
      {isConnecting ? 'Connecting...' : 'Connect Wallet'}
    </Button>
  );
}
