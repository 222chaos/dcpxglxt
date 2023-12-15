import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL + "?sslmode=require",
});

export default async function handler(req, res) {
  if (req.method === "POST") {
    const {
      departmentname,
      departmentid,
      departmentabbreviation,
      contactinfo,
      superiordepartment,
      superiordepartmentid,
      remark,
    } = req.body;

    try {
      const client = await pool.connect();
      const query = `
        INSERT INTO departmentmanagement (
          departmentname,
          departmentid,
          departmentabbreviation,
          contactinfo,
          superiordepartment,
          superiordepartmentid,
          remark
        )
        VALUES ($1, $2, $3, $4, $5, $6, $7)
        RETURNING *
      `;
      const values = [
        departmentname,
        departmentid,
        departmentabbreviation,
        contactinfo,
        superiordepartment,
        superiordepartmentid,
        remark,
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
