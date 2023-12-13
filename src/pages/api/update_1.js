import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL + "?sslmode=require",
});

export default async function handler(req, res) {
  if (req.method === "PUT") {
    const { id, year, name, type, specialty, time, participants, completion } =
      req.body;

    try {
      const client = await pool.connect();
      const query = `
        UPDATE TrainingPlans 
        SET year = $2, 
            name = $3, 
            type = $4, 
            specialty = $5, 
            time = $6, 
            participants = $7, 
            completion = $8
        WHERE id = $1
        RETURNING *
      `;
      const values = [
        id,
        year,
        name,
        type,
        specialty,
        time,
        participants,
        completion,
      ];
      const result = await client.query(query, values);

      client.release();

      res.status(200).json(result.rows[0]);
    } catch (error) {
      console.error("Error executing query:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
