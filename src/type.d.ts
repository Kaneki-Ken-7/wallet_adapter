interface Window {
    solana?: {
        isPhantom?: boolean;
        connect: () => Promise<{ publicKey: PublicKey }>;
        disconnect: () => Promise<void>;
        signAndSendTransaction: (transaction: Transaction) => Promise<string>;
        signTransaction: (transaction: Transaction) => Promise<Transaction>;
        signAllTransactions: (transactions: Transaction[]) => Promise<Transaction[]>;
        publicKey: PublicKey;
    };
}