import { Keypair } from "@solana/web3.js";

const kp = Keypair.generate();
console.log(`you've generated a new Solana wallet:\n${kp.publicKey.toBase58()}`);
console.log(`secret key:\n[${kp.secretKey.toString()}]`);