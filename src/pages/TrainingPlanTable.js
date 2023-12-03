import { Button, Space } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useRef, useState } from "react";
import ProTable from "@ant-design/pro-table";
import React from "react";

const TrainingPlanTable = () => {
  const actionRef = useRef();

  const [editableKeys, setEditableKeys] = useState([]);
  const [trainingPlanData, setTrainingPlanData] = useState([
    {
      id: 1,
      year: 2023,
      name: "新员工入厂培训",
      type: "新员工入厂培训",
      specialty: "电气   汽机   锅炉训",
      time: "1月10日-1月20日",
      participants: "100",
      completion: "未完成",
    },
    {
      id: 2,
      year: 2023,
      name: "新员工入厂培训",
      type: "新员工入厂培训",
      specialty: "电气   汽机   锅炉训",
      time: "1月10日-1月20日",
      participants: "100",
      completion: "未完成",
    },
  ]);

  const columns = [
    {
      title: "序号",
      dataIndex: "id",
      valueType: "indexBorder",
      width: 48,
    },
    {
      title: "年度",
      dataIndex: "year",
      width: 72,
    },
    {
      title: "培训计划名称",
      dataIndex: "name",
      width: 100,
    },
    {
      title: "培训类型",
      dataIndex: "type",
      search: false,
      width: 100,
    },
    {
      title: "培训专业",
      dataIndex: "specialty",
      width: 100,
    },
    {
      title: "培训时间",
      dataIndex: "time",
      search: false,
      width: 100,
    },
    {
      title: "培训人数",
      dataIndex: "participants",
      search: false,
      width: 100,
    },
    {
      title: "完成情况",
      dataIndex: "completion",
      width: 100,
    },
    {
      title: "操作",
      valueType: "option",
      width: 100,
      fixed: "right",
      render: (text, record) => [
        <a key="edit" onClick={() => handleEdit(record.id)}>
          编辑
        </a>,
        <a key="delete" onClick={() => handleDelete(record.id)}>
          删除
        </a>,
      ],
    },
  ];

  const handleEdit = (id) => {
    const keys = editableKeys.includes(id)
      ? editableKeys.filter((key) => key !== id)
      : [...editableKeys, id];
    setEditableKeys(keys);
  };

  const handleSave = async (rowKeys, newData) => {
    try {
      const editedRowIndex = rowKeys[0]; // 假设只有一行处于编辑状态
      const editedRow = newData[editedRowIndex]; // 获取当前编辑的行数据

      const response = await fetch("/api/storage", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editedRow), // 发送当前编辑行的数据给服务器
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await response.json();
      console.log("Server response:", result);

      setEditableKeys([]); // 退出所有行的编辑状态
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
      // 处理错误，例如显示错误消息给用户
    }
  };
  const handleNew = () => {
    const id = trainingPlanData.length + 1;
    const newEmptyData = {
      id,
      year: "",
      name: "",
      type: "",
      specialty: "",
      time: "",
      participants: "",
      completion: "",
    };
    setTrainingPlanData([...trainingPlanData, newEmptyData]);
    setEditableKeys([...editableKeys, id]);
  };
  const handleDelete = (id) => {
    const updatedData = trainingPlanData.filter((item) => item.id !== id);
    setTrainingPlanData(updatedData);
    setEditableKeys(editableKeys.filter((key) => key !== id));
  };
  return (
    <div>
      <ProTable
        columns={columns}
        actionRef={actionRef}
        dataSource={trainingPlanData}
        rowKey="id"
        editable={{
          type: "multiple",
          editableKeys,
          onSave: handleSave,
          onDelete: handleDelete,
          onChange: setEditableKeys,
        }}
        toolBarRender={() => [
          <Button
            key="button"
            icon={<PlusOutlined />}
            type="primary"
            onClick={handleNew}
          >
            新建
          </Button>,
        ]}
      />
    </div>
  );
};

export default TrainingPlanTable;
