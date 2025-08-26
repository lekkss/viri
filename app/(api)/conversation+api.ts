import { neon } from "@neondatabase/serverless";

export async function POST(request: Request) {
  try {
    const sql = neon(`${process.env.DATABASE_URL}`);
    const { user_id, title } = await request.json();

    if (!user_id) {
      return Response.json({ error: "user_id is required" }, { status: 400 });
    }

    const result = await sql`
      INSERT INTO conversations (user_id, title)
      VALUES (${user_id}, ${title || null})
      RETURNING id, user_id, title, created_at, updated_at, is_active
    `;

    return Response.json({ conversation: result[0] });
  } catch (error) {
    console.error("Error creating conversation:", error);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function GET(request: Request) {
  try {
    const sql = neon(`${process.env.DATABASE_URL}`);
    const { searchParams } = new URL(request.url);
    const user_id = searchParams.get("user_id");

    if (!user_id) {
      return Response.json({ error: "user_id is required" }, { status: 400 });
    }

    const conversations = await sql`
      SELECT 
        c.id,
        c.user_id,
        c.title,
        c.created_at,
        c.updated_at,
        c.is_active,
        COUNT(m.id) as message_count,
        MAX(m.created_at) as last_message_at
      FROM conversations c
      LEFT JOIN messages m ON c.id = m.conversation_id
      WHERE c.user_id = ${user_id} AND c.is_active = true
      GROUP BY c.id, c.user_id, c.title, c.created_at, c.updated_at, c.is_active
      ORDER BY c.updated_at DESC
    `;

    return Response.json({ conversations });
  } catch (error) {
    console.error("Error fetching conversations:", error);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
