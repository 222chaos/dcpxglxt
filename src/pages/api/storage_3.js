import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL + "?sslmode=require",
});

export default async function storage_3(req, res) {
  if (req.method === "POST") {
    const {
      name,
      department,
      attendance_count,
      attendance_score,
      exam_score,
      total_score,
    } = req.body;

    try {
      const client = await pool.connect();
      const query = `
        INSERT INTO trainingmanagement (name, department, attendance_count, attendance_score, exam_score, total_score)
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING *
      `;
      const values = [
        name,
        department,
        attendance_count,
        attendance_score,
        exam_score,
        total_score,
      ];
      const result = await client.query(query, values);

      client.release();

      res.status(200).json(result.rows[0]);
    } catch (error) {
      console.error("Error executing query:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
}
