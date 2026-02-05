export async function GET() {
  return new Response(JSON.stringify({ message: "Test Room route works!" }), {
    status: 200,
  });
}