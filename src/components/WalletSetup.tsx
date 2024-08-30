import React from 'react';
// import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';

const WalletSetup: React.FC = () => {
    return (
        <div className="bg-gray-100 p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">Welcome to Solana!</h2>
            <p className="mb-4">To get started, you'll need to set up a Solana wallet. Follow these steps:</p>
            <ol className="list-decimal list-inside mb-6">
                <li className="mb-2">Install a Solana wallet extension (like Phantom or Solflare) in your browser</li>
                <li className="mb-2">Create a new wallet or import an existing one</li>
                <li className="mb-2">Make sure you're connected to the Solana devnet</li>
                <li>Click the button to connect your wallet to this app</li>
            </ol>
            {/* <WalletMultiButton className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded" /> */}
        </div>
    );
};

export default WalletSetup;