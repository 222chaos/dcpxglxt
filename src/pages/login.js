import { useState } from "react";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        // 处理成功登录的逻辑，例如存储 token 到本地
        // 重定向到授权页面或其他受保护的内容
        console.log("登录成功！");
      } else {
        console.error("登录失败，请检查用户名和密码。");
      }
    } catch (error) {
      console.error("登录出错：", error);
    }
  };

  const handleRegister = async () => {
    // 处理用户注册的逻辑
    // 向后端发送注册请求
    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        console.log("注册成功！请登录。");
      } else {
        console.error("注册失败，请重试。");
      }
    } catch (error) {
      console.error("注册出错：", error);
    }
  };

  return (
    <div>
      <h2>登录</h2>
      <form>
        <div>
          <label>用户名：</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label>密码：</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <button type="button" onClick={handleLogin}>
            登录
          </button>
          <button type="button" onClick={handleRegister}>
            注册
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
