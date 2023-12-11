import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL + "?sslmode=require",
});

export default async function query(req, res) {
  if (req.method === "GET") {
    try {
      const { current, pageSize, year, type, specialty, completion } =
        req.query;
      const parsedCurrent = parseInt(current, 10);
      const parsedPageSize = parseInt(pageSize, 10);

      if (isNaN(parsedCurrent) || isNaN(parsedPageSize)) {
        throw new Error(
          "Invalid parameters: current and pageSize must be numbers"
        );
      }

      const client = await pool.connect();

      let filterQuery = "WHERE status = true"; // 根据实际情况调整 WHERE 条件

      if (year) {
        filterQuery += ` AND year = '${year}'`; // 根据传入的 year 参数添加查询条件
      }

      if (type) {
        filterQuery += ` AND type = '${type}'`; // 根据传入的 type 参数添加查询条件
      }

      if (specialty) {
        filterQuery += ` AND specialty = '${specialty}'`; // 根据传入的 specialty 参数添加查询条件
      }

      if (completion) {
        filterQuery += ` AND completion = '${completion}'`; // 根据传入的 completion 参数添加查询条件
      }

      // 根据需要添加更多查询参数的条件

      const queryCount = `SELECT COUNT(*) AS total FROM trainingplans ${filterQuery}`;
      const resultCount = await client.query(queryCount);
      const total = parseInt(resultCount.rows[0].total);

      const offset = (parsedCurrent - 1) * parsedPageSize;
      const queryData = `SELECT * FROM trainingplans ${filterQuery} ORDER BY id ASC LIMIT ${parsedPageSize} OFFSET ${offset}`;
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
