import React, { useState } from "react";
import Link from "next/link";
import TrainingPlanTable from "./TrainingPlanTable";
import EmployeeManagement from "./EmployeeManagement";
import TrainingManagement from "./TrainingManagement";
import DepartmentManagement from "./DepartmentManagement";
import Login from "./Login"; // 导入登录组件
import styles from "./styles.module.css";

const HomePage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // 添加登录状态
  const [selectedFunction, setSelectedFunction] = useState("");

  const handleFunctionClick = (functionName) => {
    setSelectedFunction(functionName);
  };

  const renderFunctionContent = () => {
    if (!isLoggedIn) {
      // 如果用户未登录，显示登录组件
      return <Login setIsLoggedIn={setIsLoggedIn} />;
    }

    // 如果用户已登录，显示其他内容
    switch (selectedFunction) {
      case "首页":
        return (
          <div>
            <h2>欢迎来到电厂培训管理系统！</h2>
            <p>
              这个系统旨在提供一套完整的培训管理解决方案，让您能够高效地管理培训计划、员工信息以及部门资源。
            </p>
            <p>
              通过侧边栏功能列表，您可以轻松访问不同的模块，包括计划管理、员工管理、部门管理和培训管理。点击相应功能以开始操作。
            </p>
            <p>对于任何疑问或帮助，您可以查看系统文档或联系管理员获取支持。</p>
          </div>
        );
      case "计划管理":
        return (
          <div>
            <TrainingPlanTable />
          </div>
        );
      case "员工管理":
        return (
          <div>
            <EmployeeManagement />
          </div>
        );
      case "培训管理":
        return (
          <div>
            <TrainingManagement />
          </div>
        );
      case "部门管理":
        return (
          <div>
            <DepartmentManagement />
          </div>
        );

      default:
        return <div>选择左侧功能以开始操作。</div>;
    }
  };

  return (
    <div>
      <h1>电厂培训管理系统</h1>
      <div className={styles.container}>
        {!isLoggedIn ? (
          // 如果用户未登录，不显示侧边栏和其他内容
          <div className={styles.maincontent}>{renderFunctionContent()}</div>
        ) : (
          // 如果用户已登录，显示侧边栏和其他内容
          <>
            <div className={styles.sidebar}>
              <h3>功能列表</h3>
              <ul className={styles.ul}>
                <li
                  className={styles.li}
                  onClick={() => handleFunctionClick("首页")}
                >
                  <Link href="#">首页</Link>
                </li>
                <li
                  className={styles.li}
                  onClick={() => handleFunctionClick("计划管理")}
                >
                  <Link href="#">计划管理</Link>
                </li>
                <li
                  className={styles.li}
                  onClick={() => handleFunctionClick("员工管理")}
                >
                  <Link href="#">员工管理</Link>
                </li>
                <li
                  className={styles.li}
                  onClick={() => handleFunctionClick("部门管理")}
                >
                  <Link href="#">部门管理</Link>
                </li>
                <li
                  className={styles.li}
                  onClick={() => handleFunctionClick("培训管理")}
                >
                  <Link href="#">培训管理</Link>
                </li>
              </ul>
            </div>
            <div className={styles.maincontent}>{renderFunctionContent()}</div>
          </>
        )}
      </div>
    </div>
  );
};

export default HomePage;
