import bs58 from "bs58";
import promptSync from "prompt-sync";
const prompt = promptSync();

console.log("Choose operation:\n1. base58 → Uint8Array\n2. Uint8Array → base58");
const choice = prompt("Enter 1 or 2: ");

if (choice === "1") {
  const base58Input = prompt("Enter base58 private key: ");
  const decoded = bs58.decode(base58Input);
  console.log("Uint8Array / JSON array:\n", JSON.stringify([...decoded], null, 2));
} else if (choice === "2") {
  const arrayInput = prompt("Enter Uint8Array (comma-separated numbers): ");
  try {
    const parsed = JSON.parse(`[${arrayInput}]`);
    const encoded = bs58.encode(Uint8Array.from(parsed));
    console.log("Base58 private key:\n", encoded);
  } catch (e) {
    console.error("Invalid input!");
  }
} else {
  console.log("Invalid choice.");
}