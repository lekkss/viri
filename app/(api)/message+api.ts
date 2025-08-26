import { neon } from "@neondatabase/serverless";

export async function POST(request: Request) {
  try {
    const sql = neon(`${process.env.DATABASE_URL}`);
    const { conversation_id, user_id, role, content, model_used, tokens_used } =
      await request.json();

    if (!conversation_id || !user_id || !role || !content) {
      return Response.json(
        {
          error: "conversation_id, user_id, role, and content are required",
        },
        { status: 400 }
      );
    }

    const result = await sql`
      INSERT INTO messages (conversation_id, user_id, role, content, model_used, tokens_used)
      VALUES (${conversation_id}, ${user_id}, ${role}, ${content}, ${model_used || null}, ${tokens_used || null})
      RETURNING id, conversation_id, user_id, role, content, model_used, tokens_used, created_at
    `;

    return Response.json({ message: result[0] });
  } catch (error) {
    console.error("Error creating message:", error);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function GET(request: Request) {
  try {
    const sql = neon(`${process.env.DATABASE_URL}`);
    const { searchParams } = new URL(request.url);
    const conversation_id = searchParams.get("conversation_id");

    if (!conversation_id) {
      return Response.json(
        { error: "conversation_id is required" },
        { status: 400 }
      );
    }

    const messages = await sql`
      SELECT 
        id,
        conversation_id,
        user_id,
        role,
        content,
        model_used,
        tokens_used,
        created_at
      FROM messages
      WHERE conversation_id = ${conversation_id}
      ORDER BY created_at ASC
    `;

    return Response.json({ messages });
  } catch (error) {
    console.error("Error fetching messages:", error);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
