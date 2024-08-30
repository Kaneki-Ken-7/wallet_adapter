import React, { useState } from 'react';
import { Connection, PublicKey, Transaction, SystemProgram, LAMPORTS_PER_SOL } from '@solana/web3.js';

interface TransactionTutorialProps {
    publicKey: PublicKey | null;
    connection: Connection | null;
    onTransactionComplete: () => void;
}

const TransactionTutorial: React.FC<TransactionTutorialProps> = ({ publicKey, connection, onTransactionComplete }) => {
    const [recipient, setRecipient] = useState('');
    const [amount, setAmount] = useState('');
    const [isTransacting, setIsTransacting] = useState(false);
    const [transactionError, setTransactionError] = useState<string | null>(null);

    const handleTransaction = async () => {
        if (!publicKey || !connection || !window.solana) {
            setTransactionError("Wallet not connected or connection not established");
            return;
        }
    
        setIsTransacting(true);
        setTransactionError(null);
    
        try {
            const recipientPubkey = new PublicKey(recipient);
            const lamports = parseFloat(amount) * LAMPORTS_PER_SOL;
    
            const { blockhash } = await connection.getLatestBlockhash('confirmed');
    
            const transaction = new Transaction({
                recentBlockhash: blockhash,
                feePayer: publicKey,
            }).add(
                SystemProgram.transfer({
                    fromPubkey: publicKey,
                    toPubkey: recipientPubkey,
                    lamports,
                })
            );
    
            await window.solana.signAndSendTransaction(transaction);

            // await connection.confirmTransaction(signature, 'confirmed');
    
            onTransactionComplete();
            setRecipient('');
            setAmount('');
        } catch (error) {
            console.error("Transaction error:", error);
    
            if (error instanceof Error) {
                if (error.message.includes("not been authorized by the user")) {
                    setTransactionError("Transaction was not authorized. Please approve the transaction in your wallet.");
                } else {
                    setTransactionError("Failed to send transaction. Please check the details and try again.");
                }
            } else {
                setTransactionError("An unknown error occurred. Please try again.");
            }
        } finally {
            setIsTransacting(false);
        }
    };
    
    
    

    return (
        <div className="bg-green-100 text-black p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">Send Your First Transaction</h2>
            <p className="mb-4">Now that you have some SOL, let's try sending a transaction:</p>
            <input
                type="text"
                placeholder="Recipient address"
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
                className="w-full p-2 mb-2 border rounded"
            />
            <input
                type="number"
                placeholder="Amount (SOL)"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full p-2 mb-4 border rounded"
            />
            <button
                onClick={handleTransaction}
                disabled={isTransacting || !publicKey || !recipient || !amount}
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
            >
                {isTransacting ? "Sending..." : "Send Transaction"}
            </button>
            {transactionError && <p className="text-red-500 mt-2">{transactionError}</p>}
        </div>
    );
};

export default TransactionTutorial;