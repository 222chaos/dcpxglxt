import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL + "?sslmode=require",
});

export default async function registerHandler(req, res) {
  if (req.method === "POST") {
    const { username, password } = req.body;

    try {
      const client = await pool.connect();
      const result = await client.query(
        "INSERT INTO users (username, password) VALUES ($1, $2)",
        [username, password]
      );
      client.release();

      res.status(201).json({ message: "用户注册成功" });
    } catch (error) {
      console.error("注册失败:", error);
      res.status(500).json({ error: "注册过程中出现问题" });
    }
  } else {
    res.status(405).json({ error: "只允许POST请求" });
  }
}
