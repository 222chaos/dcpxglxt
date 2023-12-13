import { Pool } from "pg";
import querystring from "querystring";

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL + "?sslmode=require",
});

export default async function query(req, res) {
  if (req.method === "GET") {
    try {
      const parsedUrl = req.url.split("?"); // Separating path and query parameters
      const queryParameters = parsedUrl[1]; // Getting the query string part

      const queryParamsObject = querystring.parse(queryParameters); // Parsing query parameters using querystring

      const { current, pageSize, name, id_card_number } = queryParamsObject;
      const parsedCurrent = parseInt(current, 10);
      const parsedPageSize = parseInt(pageSize, 10);

      if (isNaN(parsedCurrent) || isNaN(parsedPageSize)) {
        throw new Error(
          "Invalid parameters: current and pageSize must be numbers"
        );
      }

      const client = await pool.connect();

      let filterQuery = "WHERE status = true"; // Adjust WHERE condition based on your actual scenario

      if (name) {
        filterQuery += ` AND name = '${name}'`; // Add query condition based on the 'name' parameter passed
      }

      if (id_card_number) {
        filterQuery += ` AND id_card_number = '${id_card_number}'`; // Add query condition based on the 'id_card_number' parameter passed
      }

      // Add more query conditions based on your requirements

      const queryCount = `SELECT COUNT(*) AS total FROM employeemanagement ${filterQuery}`;
      const resultCount = await client.query(queryCount);
      const total = parseInt(resultCount.rows[0].total);

      const offset = (parsedCurrent - 1) * parsedPageSize;
      const queryData = `SELECT * FROM employeemanagement ${filterQuery} ORDER BY id ASC LIMIT ${parsedPageSize} OFFSET ${offset}`;
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
