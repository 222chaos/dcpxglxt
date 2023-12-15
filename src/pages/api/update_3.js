import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL + "?sslmode=require",
});

export default async function update_3(req, res) {
  if (req.method === "PUT") {
    const {
      id,
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
        UPDATE trainingmanagement
        SET name= $2, 
            department= $3, 
            attendance_count= $4, 
            attendance_score= $5, 
            exam_score= $6, 
            total_score = $7
        WHERE id = $1
        RETURNING *
      `;
      const values = [
        id,
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
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
