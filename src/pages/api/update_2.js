import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL + "?sslmode=require",
});

export default async function handler(req, res) {
  if (req.method === "PUT") {
    const { id, name, id_card_number /* Add more fields as needed */ } =
      req.body;

    try {
      const client = await pool.connect();
      const query = `
        UPDATE EmployeeManagement 
        SET name = $2, 
            id_card_number = $3
        WHERE id = $1
        RETURNING *
      `;
      const values = [id, name, id_card_number];
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
