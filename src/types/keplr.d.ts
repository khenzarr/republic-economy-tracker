interface Window {
  keplr?: {
    enable: (chainId: string) => Promise<void>;
    getKey: (chainId: string) => Promise<{
      bech32Address: string;
      pubKey: Uint8Array;
      name: string;
    }>;
    experimentalSuggestChain: (chainInfo: any) => Promise<void>;
  };
}
