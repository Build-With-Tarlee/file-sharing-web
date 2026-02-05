import { db } from "@/lib/firebase";
import { ref, set } from "firebase/database";
import { v4 as uuidv4 } from "uuid";

export async function POST() {
  // Generate a unique room ID
  const roomId = uuidv4();

  // Generate a random 4-digit PIN
  const pin = Math.floor(1000 + Math.random() * 9000).toString();

  // Add timestamps
  const createdAt = new Date().toISOString();
  const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString();

  // Write to Realtime Database
  await set(ref(db, `rooms/${roomId}`), {
    pin,
    createdAt,
    expiresAt,
    files: {}
  });

  // Return JSON response
  return new Response(JSON.stringify({ roomId, pin }), { status: 201 });
}