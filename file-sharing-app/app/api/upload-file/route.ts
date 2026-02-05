import { db, storage } from "@/lib/firebase";
import { ref as dbRef, update } from "firebase/database";
import { ref as storageRef, uploadBytes, getDownloadURL } from "firebase/storage";

export async function POST(request: Request) {
  const formData = await request.formData();
  const roomId = formData.get("roomId") as string;
  const file = formData.get("file") as File;

  if (!roomId || !file) {
    return new Response(JSON.stringify({ error: "Missing roomId or file" }), { status: 400 });
  }

  // Upload file to Firebase Storage
  const fileRef = storageRef(storage, `rooms/${roomId}/${file.name}`);
  const buffer = Buffer.from(await file.arrayBuffer());
  await uploadBytes(fileRef, buffer);

  // Get download URL
  const url = await getDownloadURL(fileRef);

  // Save file metadata in Realtime Database
  await update(dbRef(db, `rooms/${roomId}/files`), {
    [file.name]: {
      url,
      uploadedAt: new Date().toISOString(),
    },
  });

  return new Response(JSON.stringify({ message: "File uploaded successfully", url }), { status: 201 });
}