import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL + "?sslmode=require",
});

export default async function loginHandler(req, res) {
  if (req.method === "POST") {
    const { username, password } = req.body;

    try {
      const client = await pool.connect();
      const result = await client.query(
        "SELECT * FROM users WHERE username = $1 AND password = $2",
        [username, password]
      );
      client.release();

      if (result.rows.length > 0) {
        res.status(200).json({ message: "登录成功" });
      } else {
        res.status(401).json({ error: "用户名或密码不正确" });
      }
    } catch (error) {
      console.error("登录失败:", error);
      res.status(500).json({ error: "登录过程中出现问题" });
    }
  } else {
    res.status(405).json({ error: "只允许POST请求" });
  }
}
