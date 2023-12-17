import React, { useState } from "react";
import { useRouter } from "next/router";

const Login = ({ setIsLoggedIn }) => {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [registerMode, setRegisterMode] = useState(false);

  const containerStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  };

  const inputStyle = {
    margin: "5px",
    padding: "8px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    width: "250px",
  };

  const buttonStyle = {
    margin: "5px",
    padding: "8px 15px",
    borderRadius: "5px",
    border: "none",
    cursor: "pointer",
    backgroundColor: "#007bff",
    color: "#fff",
  };

  const handleLogin = async () => {
    // 通过API与数据库验证用户名和密码
    try {
      const response = await fetch("/api/login", {
        method: "POST",
        body: JSON.stringify({ username, password }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (response.ok) {
        setIsLoggedIn(true);
        router.push("/"); // 登录成功后重定向到主页或其他页面
      } else {
        setLoginError(data.error);
      }
    } catch (error) {
      console.error("登录失败：", error);
      setLoginError("登录失败，请重试。");
    }
  };

  const handleRegister = async () => {
    // 处理注册逻辑
    try {
      const response = await fetch("/api/register", {
        method: "POST",
        body: JSON.stringify({ username, password }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (response.ok) {
        // 注册成功后的处理，例如关闭注册模态框或显示成功消息
      } else {
        console.error("注册失败：", data.error);
      }
    } catch (error) {
      console.error("注册失败：", error);
      // 处理注册过程中的错误
    }
  };

  return (
    <div style={containerStyle}>
      <h2>{registerMode ? "注册" : "登录"}</h2>
      {loginError && <p>{loginError}</p>}
      <div>
        <input
          type="text"
          placeholder="用户名"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={inputStyle}
        />
      </div>
      <div>
        <input
          type="password"
          placeholder="密码"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={inputStyle}
        />
      </div>
      {registerMode && (
        <div>
          <input
            type="password"
            placeholder="确认密码"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            style={inputStyle}
          />
        </div>
      )}
      <div>
        <button
          onClick={registerMode ? handleRegister : handleLogin}
          style={buttonStyle}
        >
          {registerMode ? "注册" : "登录"}
        </button>
        <button
          onClick={() => setRegisterMode(!registerMode)}
          style={buttonStyle}
        >
          {registerMode ? "返回登录" : "注册"}
        </button>
      </div>
    </div>
  );
};

export default Login;
