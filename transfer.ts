import {
  Connection, Keypair, Transaction, SystemProgram,
  LAMPORTS_PER_SOL, sendAndConfirmTransaction, PublicKey
} from "@solana/web3.js";
import wallet from "./dev-wallet.json";

const from = Keypair.fromSecretKey(new Uint8Array(wallet));
const to = new PublicKey("87eaezi5Nou5d5MFH2DStENzWZ6iHNroDHZSbSca4RDu");
const connection = new Connection("https://api.devnet.solana.com");

// (async () => {
//   try {
//     const tx = new Transaction().add(SystemProgram.transfer({
//       fromPubkey: from.publicKey,
//       toPubkey: to,
//       lamports: LAMPORTS_PER_SOL / 10,
//     }));
//     tx.recentBlockhash = (await connection.getLatestBlockhash()).blockhash;
//     tx.feePayer = from.publicKey;
//     const sig = await sendAndConfirmTransaction(connection, tx, [from]);
//     console.log(`success: https://explorer.solana.com/tx/${sig}?cluster=devnet`);
//   } catch (e) {
//     console.error(e);
//   }
// })();


(async () => {
  try {
    const balance = await connection.getBalance(from.publicKey);
    let tx = new Transaction().add(SystemProgram.transfer({
      fromPubkey: from.publicKey,
      toPubkey: to,
      lamports: balance,
    }));
    tx.recentBlockhash = (await connection.getLatestBlockhash()).blockhash;
    tx.feePayer = from.publicKey;
    const fee = (await connection.getFeeForMessage(tx.compileMessage(), 'confirmed')).value || 0;
    tx.instructions.pop();
    tx.add(SystemProgram.transfer({
      fromPubkey: from.publicKey,
      toPubkey: to,
      lamports: balance - fee,
    }));
    const sig = await sendAndConfirmTransaction(connection, tx, [from]);
    console.log(`success: https://explorer.solana.com/tx/${sig}?cluster=devnet`);
  } catch (e) {
    console.error(e);
  }
})();