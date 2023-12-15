import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL + "?sslmode=require",
});

export default async function handler(req, res) {
  if (req.method === "PUT") {
    const {
      id,
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
        UPDATE departmentmanagement 
        SET 
          departmentname = $2, 
          departmentid = $3, 
          departmentabbreviation = $4, 
          contactinfo = $5, 
          superiordepartment = $6, 
          superiordepartmentid = $7, 
          remark = $8
        WHERE id = $1
        RETURNING *
      `;
      const values = [
        id,
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
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
