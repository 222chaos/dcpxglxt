import { useState } from "react";
import Link from "next/link";

const HomePage = () => {
  const [selectedFunction, setSelectedFunction] = useState("");

  const handleFunctionClick = (functionName) => {
    setSelectedFunction(functionName);
  };

  const renderFunctionContent = () => {
    switch (selectedFunction) {
      case "首页":
        return <div>首页内容</div>;
      case "培训计划管理":
        return <div>培训计划管理内容</div>;
      case "添加":
        return <div>添加内容</div>;
      case "修改":
        return <div>修改内容</div>;
      case "删除":
        return <div>删除内容</div>;
      case "查询":
        return <div>查询内容</div>;
      case "培训成绩管理":
        return <div>培训成绩管理内容</div>;
      case "录入":
        return <div>录入内容</div>;
      case "修改":
        return <div>修改内容</div>;
      case "查询":
        return <div>查询内容</div>;
      case "学员管理":
        return <div>学员管理内容</div>;
      case "部门管理":
        return <div>部门管理内容</div>;
      case "学员基本信息管理":
        return <div>学员基本信息管理内容</div>;
      case "指纹库管理":
        return <div>指纹库管理内容</div>;
      case "系统管理":
        return <div>系统管理内容</div>;
      case "用户管理":
        return <div>用户管理内容</div>;
      case "字典管理":
        return <div>字典管理内容</div>;

      // 添加其他功能的内容
      default:
        return <div>选择左侧功能以开始操作。</div>;
    }
  };

  return (
    <div>
      <h1>电厂培训管理系统</h1>
      <div className="sidebar">
        <h3>功能列表</h3>
        <ul>
          <li onClick={() => handleFunctionClick("首页")}>
            <Link href="#">首页</Link>
          </li>
          <li onClick={() => handleFunctionClick("培训计划管理")}>
            <Link href="#">培训计划管理</Link>
          </li>
          <li onClick={() => handleFunctionClick("添加")}>
            <Link href="#">添加</Link>
          </li>
          <li onClick={() => handleFunctionClick("修改")}>
            <Link href="#">修改</Link>
          </li>
          <li onClick={() => handleFunctionClick("删除")}>
            <Link href="#">删除</Link>
          </li>
          <li onClick={() => handleFunctionClick("查询")}>
            <Link href="#">查询</Link>
          </li>
          <li onClick={() => handleFunctionClick("培训成绩管理")}>
            <Link href="#">培训成绩管理</Link>
          </li>
          <li onClick={() => handleFunctionClick("录入")}>
            <Link href="#">录入</Link>
          </li>
          <li onClick={() => handleFunctionClick("修改")}>
            <Link href="#">修改</Link>
          </li>
          <li onClick={() => handleFunctionClick("查询")}>
            <Link href="#">查询</Link>
          </li>
          <li onClick={() => handleFunctionClick("学员管理")}>
            <Link href="#">学员管理</Link>
          </li>
          <li onClick={() => handleFunctionClick("部门管理")}>
            <Link href="#">部门管理</Link>
          </li>
          <li onClick={() => handleFunctionClick("学员基本信息管理")}>
            <Link href="#">学员基本信息管理</Link>
          </li>
          <li onClick={() => handleFunctionClick("培训计划管理")}>
            <Link href="#">学习记录管理</Link>
          </li>
          <li onClick={() => handleFunctionClick("指纹库管理")}>
            <Link href="#">指纹库管理</Link>
          </li>
          <li onClick={() => handleFunctionClick("系统管理")}>
            <Link href="#">系统管理</Link>
          </li>
          <li onClick={() => handleFunctionClick("用户管理")}>
            <Link href="#">用户管理</Link>
          </li>
          <li onClick={() => handleFunctionClick("字典管理")}>
            <Link href="#">字典管理</Link>
          </li>
        </ul>
      </div>
      <div className="main-content">
        <h2>欢迎使用电厂培训管理系统</h2>
        {renderFunctionContent()}
      </div>
      <style jsx>{`
        .sidebar {
          float: left;
          width: 10%;
          border: 1px solid #ccc;
          padding: 8px;
        }
        .main-content {
          float: left;
          width: 80%;
          margin-left: 16px;
          border: 1px solid #ccc;
        }
        ul {
          list-style: none;
          padding: 0;
        }
        li {
          margin-bottom: 8px;
          cursor: pointer;
          padding: 5px;
          border-radius: 5px;
          transition: background-color 0.3s ease;
        }
        li:hover {
          background-color: #f0f0f0;
        }
      `}</style>
    </div>
  );
};

export default HomePage;
