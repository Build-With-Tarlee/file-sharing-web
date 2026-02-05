import { db } from "@/lib/firebase";
import { ref, get } from "firebase/database";

export async function GET() {
  // Just return a simple message for now
  return new Response(JSON.stringify({ message: "Join Room GET route works!" }), {
    status: 200,
  });
}

export async function POST(request: Request) {
  const { roomId, pin } = await request.json();

  const roomRef = ref(db, `rooms/${roomId}`);
  const snapshot = await get(roomRef);

  if (!snapshot.exists()) {
    return new Response(JSON.stringify({ error: "Room not found" }), { status: 404 });
  }

  const roomData = snapshot.val();

  if (roomData.pin !== pin) {
    return new Response(JSON.stringify({ error: "Invalid PIN" }), { status: 401 });
  }

  return new Response(JSON.stringify({ roomId, ...roomData }), { status: 200 });
}