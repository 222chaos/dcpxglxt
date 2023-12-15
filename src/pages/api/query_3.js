import { Pool } from "pg";
import querystring from "querystring";

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL + "?sslmode=require",
});

export default async function query_3(req, res) {
  if (req.method === "GET") {
    try {
      const parsedUrl = req.url.split("?");
      const queryParameters = parsedUrl[1];

      const queryParamsObject = querystring.parse(queryParameters);

      const {
        current,
        pageSize,
        name,
        department,
        /* Add more parameters if needed */
      } = queryParamsObject;

      const parsedCurrent = parseInt(current, 10);
      const parsedPageSize = parseInt(pageSize, 10);

      if (isNaN(parsedCurrent) || isNaN(parsedPageSize)) {
        throw new Error(
          "Invalid parameters: current and pageSize must be numbers"
        );
      }

      const client = await pool.connect();

      let filterQuery = "WHERE status = true";

      if (name) {
        filterQuery += ` AND name = '${name}'`;
      }

      if (department) {
        filterQuery += ` AND department = '${department}'`;
      }

      // Add more conditions for other parameters if necessary

      const queryCount = `SELECT COUNT(*) AS total FROM trainingmanagement ${filterQuery}`;
      const resultCount = await client.query(queryCount);
      const total = parseInt(resultCount.rows[0].total);

      const offset = (parsedCurrent - 1) * parsedPageSize;
      const queryData = `SELECT * FROM trainingmanagement ${filterQuery} ORDER BY id ASC LIMIT ${parsedPageSize} OFFSET ${offset}`;
      const resultData = await client.query(queryData);

      client.release();

      res.status(200).json({
        data: resultData.rows,
        total,
        success: true,
      });
    } catch (error) {
      console.error("Error executing query:", error);
      res.status(500).json({ error: error.message || "Internal server error" });
    }
  }
}
