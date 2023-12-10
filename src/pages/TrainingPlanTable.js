import React, { useRef, useState } from "react";
import { Button } from "antd";
import ProTable from "@ant-design/pro-table";

const TrainingPlanTable = () => {
  const actionRef = useRef();

  const [editableKeys, setEditableKeys] = useState([]);
  const [trainingPlanData, setTrainingPlanData] = useState([]);

  const handleSave = async (rowKeys, newData) => {
    console.log(newData);
    try {
      const response = await fetch(`/api/updata`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newData),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const updatedData = trainingPlanData.map((item) => {
        if (item.id === newData.id) {
          return newData; // 更新对应ID的数据
        }
        return item;
      });

      setTrainingPlanData(updatedData);
      setEditableKeys([]); // 退出所有行的编辑状态
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
      // 处理错误，例如显示错误消息给用户
    }
  };
  const handleEdit = (id) => {
    const keys = editableKeys.includes(id)
      ? editableKeys.filter((key) => key !== id)
      : [...editableKeys, id];
    setEditableKeys(keys);
  };

  const handleNew = async () => {
    try {
      const response = await fetch("/api/storage", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({}), // 发送空数据到服务器
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const newEmptyData = await response.json();

      setTrainingPlanData([newEmptyData, ...trainingPlanData]);
      setEditableKeys([newEmptyData.id, ...editableKeys]); // 使新行处于编辑状态

      if (actionRef.current) {
        actionRef.current.reload(); // 刷新表格数据
      }
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
      // 处理错误，例如显示错误消息给用户
    }
  };
  const handleDelete = async (id) => {
    try {
      const response = await fetch("/api/delete", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }), // 将要删除的项的唯一标识符发送至后端
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      // 处理成功删除的逻辑，可能是更新前端的数据状态等
      const updatedData = trainingPlanData.filter((item) => item.id !== id);
      setTrainingPlanData(updatedData);

      // 可能还需要其他操作，例如刷新表格数据等
      if (actionRef.current) {
        actionRef.current.reload();
      }
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
    }
  };

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

  return (
    <div>
      <ProTable
        columns={columns}
        actionRef={actionRef}
        request={async (params, _) => {
          console.log(params);

          const { current, pageSize } = params;

          // 发起数据请求，包括分页和筛选信息
          const data = await fetch(
            `/api/query?current=${current}&pageSize=${pageSize}&status=true&orderBy=id&order=desc`,
            {
              method: "GET",
              // 可以根据实际情况设置其他请求参数
            }
          );

          const responseData = await data.json();

          return {
            data: responseData.data,
            success: responseData.success,
            total: responseData.total,
          };
        }}
        rowKey="id"
        editable={{
          type: "multiple",
          editableKeys,
          onSave: handleSave,
          onDelete: handleDelete,
          onChange: setEditableKeys,
        }}
        toolBarRender={() => [
          <Button key="button" type="primary" onClick={handleNew}>
            新建
          </Button>,
        ]}
      />
    </div>
  );
};

export default TrainingPlanTable;
