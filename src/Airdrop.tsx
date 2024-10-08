import React, { useState, useEffect } from 'react';
import { Connection } from '@solana/web3.js';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';

import WalletSetup from './components/WalletSetup';
import AirdropSection from './components/AirdropSection';
import TransactionTutorial from './components/TransactionTutorial';

const Airdrop: React.FC = () => {
    const [connection, setConnection] = useState<Connection | null>(null);
    const { publicKey, connected } = useWallet();
    const [balance, setBalance] = useState<number | null>(null);
    const [isRefreshing, setIsRefreshing] = useState(false);
    useEffect(() => {
        // const connection = new Connection('https://devnet.genesysgo.net/', 'confirmed');
        const conn = new Connection('https://solana-devnet.g.alchemy.com/v2/NULFJKG70VzTo-JTgmA-CcUDywpHAS5e', 'confirmed');
        setConnection(conn);
    }, []);

    useEffect(() => {
        if (connected && publicKey && connection) {
            fetchBalance();
        } else {
            setBalance(null);
        }
    }, [connected, publicKey, connection]);

    const fetchBalance = async () => {
        if (publicKey && connection) {
            setIsRefreshing(true);
            try {
                console.log("Checking balance...");
                const balance = await connection.getBalance(publicKey);
                setBalance(balance / 1e9); // Convert lamports to SOL
            } catch (error) {
                console.error("Error fetching balance:", error);
                setBalance(null);
            } finally {
                setIsRefreshing(false);
            }
        }
    };
    

    return (
        <div className="container px-4 py-8">
            <h1 className="text-4xl font-bold mb-8">Solana DApp</h1>
            <div className="p-2 ">
                <WalletMultiButton className="mb-4" />
            </div>

            {connected ? (
                <>
                    <p className="bg-slate-600 text-white py-2 px-3 rounded-lg  my-4">Connected: {publicKey?.toBase58()}</p>
                    <p className="bg-green-600 text-white py-2 px-3 rounded-lg  my-4">Balance: {balance !== null ? `${balance} SOL` : 'Loading...'}</p>
                    <button
                        onClick={fetchBalance}
                        disabled={isRefreshing}
                        className="bg-blue-500  hover:bg-blue-700 my-4   text-white font-bold py-2 px-3 rounded-lg disabled:opacity-50"
                    >
                        {isRefreshing ? 'Refreshing...' : 'Refresh Balance'}
                    </button>
                    <div className="space-y-8">
                        <AirdropSection publicKey={publicKey} connection={connection} onAirdropComplete={fetchBalance} />
                        <TransactionTutorial publicKey={publicKey} connection={connection} onTransactionComplete={fetchBalance} />
                    </div>
                </>
            ) : (
                <div className="text-black px-4 py-8">
                <WalletSetup />
                </div>
            )}
        </div>
    );
};

export default Airdrop;