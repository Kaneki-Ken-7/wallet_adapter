// import React, { useState } from 'react';
// import { Connection, PublicKey, Keypair, Transaction, SystemProgram } from '@solana/web3.js';
// import * as splToken from '@solana/spl-token';
// import { Buffer } from 'buffer';

// interface TokenMintingProps {
//     publicKey: PublicKey | null;
//     connection: Connection | null;
// }

// const TokenMinting: React.FC<TokenMintingProps> = ({ publicKey, connection }) => {
//     const [isMinting, setIsMinting] = useState(false);
//     const [mintError, setMintError] = useState<string | null>(null);
//     const [mintedTokenAddress, setMintedTokenAddress] = useState<string | null>(null);

//     const handleMintToken = async () => {
//         if (!publicKey || !connection || !window.solana) {
//             setMintError("Wallet not connected or connection not established");
//             return;
//         }

//         setIsMinting(true);
//         setMintError(null);

//         try {
//             // Create a new mint
//             const mintKeypair = Keypair.generate();
//             const mintPublicKey = mintKeypair.publicKey;

//             // Get the minimum balance for rent exemption
//             const lamports = await splToken.getMinimumBalanceForRentExemptMint(connection);

//             // Create mint account transaction
//             const createAccountTransaction = new Transaction().add(
//                 SystemProgram.createAccount({
//                     fromPubkey: publicKey,
//                     newAccountPubkey: mintPublicKey,
//                     space: splToken.MINT_SIZE,
//                     lamports,
//                     programId: splToken.TOKEN_PROGRAM_ID,
//                 })
//             );

//             // Initialize mint instruction
//             const initializeMintInstruction = splToken.createInitializeMintInstruction(
//                 mintPublicKey,
//                 9,
//                 publicKey,
//                 publicKey
//             );

//             // Create associated token account for the user
//             const associatedTokenAccount = await splToken.getAssociatedTokenAddress(
//                 mintPublicKey,
//                 publicKey
//             );

//             const createAssociatedTokenAccountInstruction = splToken.createAssociatedTokenAccountInstruction(
//                 publicKey,
//                 associatedTokenAccount,
//                 publicKey,
//                 mintPublicKey
//             );

//             // Mint tokens to the associated token account
//             const mintToInstruction = splToken.createMintToInstruction(
//                 mintPublicKey,
//                 associatedTokenAccount,
//                 publicKey,
//                 1000000000 // 1 token with 9 decimal places
//             );

//             // Combine all instructions into one transaction
//             const transaction = new Transaction().add(
//                 createAccountTransaction,
//                 initializeMintInstruction,
//                 createAssociatedTokenAccountInstruction,
//                 mintToInstruction
//             );

//             // Sign and send the transaction
//             const signature = await window.solana.signAndSendTransaction(transaction);
//             await connection.confirmTransaction(signature);

//             setMintedTokenAddress(mintPublicKey.toBase58());
//         } catch (error) {
//             console.error("Token minting error:", error);
//             setMintError("Failed to mint token. Please try again.");
//         } finally {
//             setIsMinting(false);
//         }
//     };

//     return (
//         <div className="bg-yellow-100 p-6 rounded-lg shadow-md">
//             <h2 className="text-2xl font-bold mb-4">Mint Your Own Token</h2>
//             <p className="mb-4">Experience a unique Solana feature by minting your own token:</p>
//             <button
//                 onClick={handleMintToken}
//                 disabled={isMinting || !publicKey}
//                 className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
//             >
//                 {isMinting ? "Minting..." : "Mint Token"}
//             </button>
//             {mintError && <p className="text-red-500 mt-2">{mintError}</p>}
//             {mintedTokenAddress && (
//                 <p className="mt-4">
//                     Congratulations! Your token has been minted. Token address: {mintedTokenAddress}
//                 </p>
//             )}
//         </div>
//     );
// };

// export default TokenMinting;