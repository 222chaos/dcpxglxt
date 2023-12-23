import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL + "?sslmode=require",
});

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { name, id_card_number } = req.body;

    try {
      const client = await pool.connect();
      const query = `
        INSERT INTO EmployeeManagement (Name, Id_card_number )
        VALUES ($1, $2 )
        RETURNING *
      `;
      const values = [name, id_card_number];
      const result = await client.query(query, values);

      client.release();

      res.status(200).json(result.rows[0]);
    } catch (error) {
      console.error("Error executing query:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
}
