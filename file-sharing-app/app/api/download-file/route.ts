import { db } from "@/lib/firebase";
import { ref, get } from "firebase/database";

export async function GET() {
  return new Response(JSON.stringify({ message: "Download File GET route works!" }), { status: 200 });
}

export async function POST(request: Request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return new Response(JSON.stringify({ error: "Invalid or missing JSON body" }), { status: 400 });
  }

  const { roomId, fileName } = body || {};

  if (!roomId || !fileName) {
    return new Response(JSON.stringify({ error: "Missing roomId or fileName" }), { status: 400 });
  }

  const fileRef = ref(db, `rooms/${roomId}/files/${fileName}`);
  const snapshot = await get(fileRef);

  if (!snapshot.exists()) {
    return new Response(JSON.stringify({ error: "File not found" }), { status: 404 });
  }

  const fileData = snapshot.val();

  return new Response(JSON.stringify({ fileName, ...fileData }), { status: 200 });
}