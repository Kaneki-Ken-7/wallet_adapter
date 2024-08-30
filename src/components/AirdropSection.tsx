import React, { useState } from 'react';
import { Connection, PublicKey, LAMPORTS_PER_SOL } from '@solana/web3.js';

interface AirdropSectionProps {
    publicKey: PublicKey | null;
    connection: Connection | null;
    onAirdropComplete: () => void;
}

const AirdropSection: React.FC<AirdropSectionProps> = ({ publicKey, connection, onAirdropComplete }) => {
    const [isAirdropping, setIsAirdropping] = useState(false);
    const [airdropError, setAirdropError] = useState<string | null>(null);

    const handleAirdrop = async () => {
        if (!publicKey || !connection) {
            setAirdropError("Wallet not connected or connection not established");
            return;
        }

        setIsAirdropping(true);
        setAirdropError(null);

        try {
            await connection.requestAirdrop(
                publicKey,
                LAMPORTS_PER_SOL
            );
            
            onAirdropComplete();
        } catch (error) {
            console.error("Airdrop error:", error);
            setAirdropError("Failed to airdrop SOL. Please try again.");
        } finally {
            setIsAirdropping(false);
        }
    };

    return (
        <div className="bg-blue-100 text-black p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">Get Some SOL</h2>
            <p className="mb-4">To start using Solana, you'll need some SOL in your wallet. Click the button below to receive 1 SOL:</p>
            <button
                onClick={handleAirdrop}
                disabled={isAirdropping || !publicKey}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
            >
                {isAirdropping ? "Airdropping..." : "Request 1 SOL Airdrop"}
            </button>
            {airdropError && <p className="text-red-500 mt-2">{airdropError}</p>}
        </div>
    );
};

export default AirdropSection;
