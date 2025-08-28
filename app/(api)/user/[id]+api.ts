import { neon } from "@neondatabase/serverless";

export async function GET(request: Request, { id }: { id: string }) {
  if (!id)
    return Response.json({ error: "Missing required fields" }, { status: 400 });
  try {
    const sql = neon(`${process.env.DATABASE_URL}`);

    if (!id) {
      return Response.json({ error: "id is required" }, { status: 400 });
    }

    const response = await sql`
        SELECT * FROM users
        WHERE clerk_id = ${id};`;

    if (response.length === 0) {
      return Response.json({ error: "User not found" }, { status: 404 });
    }

    return Response.json({ data: response });
  } catch (error) {
    console.error("Error fetching user:", error);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
