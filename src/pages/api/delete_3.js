import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL + "?sslmode=require",
});

export default async function delete_3(req, res) {
  if (req.method === "DELETE") {
    try {
      const { id } = req.body;

      const client = await pool.connect();

      const query = `
        DELETE FROM trainingmanagement WHERE id = $1
        RETURNING *
      `;

      const result = await client.query(query, [id]);

      client.release();

      if (result.rowCount > 0) {
        res
          .status(200)
          .json({ success: true, message: "Item deleted successfully" });
      } else {
        res.status(404).json({
          success: false,
          message: "Item not found or already deleted",
        });
      }
    } catch (error) {
      console.error("Error executing query:", error);
      res.status(500).json({
        success: false,
        error: error.message || "Internal server error",
      });
    }
  } else {
    res.status(405).json({ success: false, error: "Method not allowed" });
  }
}
