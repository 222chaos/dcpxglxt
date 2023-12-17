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
        return <div>首页内容</div>;
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
            <div className={styles.maincontent}>
              <h2> 欢迎使用电厂培训管理系统</h2>
              {renderFunctionContent()}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default HomePage;
