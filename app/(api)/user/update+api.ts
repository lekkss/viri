import { neon } from "@neondatabase/serverless";


export async function PATCH(request: Request) {
    try {
      const sql = neon(`${process.env.DATABASE_URL}`);
      const { email, name } = await request.json();
  
      if (!email || !name) {
        return Response.json(
          { error: "Missing required fields" },
          { status: 400 }
        );
      }
  
      const response = await sql`
        UPDATE users 
        SET name = ${name}
        WHERE email = ${email}
        RETURNING *;`;
  
      if (response.length === 0) {
        return Response.json({ error: "User not found" }, { status: 404 });
      }
  
      return new Response(JSON.stringify({ data: response[0] }), {
        status: 200,
      });
    } catch (error) {
      console.error("Error updating user:", error);
      return Response.json({ error: "Internal Server Error" }, { status: 500 });
    }
  }