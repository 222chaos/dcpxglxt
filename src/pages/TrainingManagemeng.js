import React, { useRef, useState } from "react";
import { Button } from "antd";
import ProTable from "@ant-design/pro-table";
import querystring from "querystring";

const TrainingManagement = () => {
  const actionRef = useRef();

  const [editableKeys, setEditableKeys] = useState([]);
  const [trainingData, setTrainingData] = useState([]);

  const handleSave = async (rowKeys, newData) => {
    console.log(newData);
    try {
      const response = await fetch(`/api/update_3`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newData),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const updatedData = trainingData.map((item) => {
        if (item.id === newData.id) {
          return newData;
        }
        return item;
      });
      setTrainingData(updatedData);
      setEditableKeys([]);
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
    }
  };

  const handleEdit = (id) => {
    const keys = editableKeys.includes(id)
      ? editableKeys.filter((key) => key !== id)
      : [...editableKeys, id];
    console.log("Editable Keys:", keys); // 添加日志以观察编辑状态的变化
    setEditableKeys(keys);
  };

  const handleNew = async () => {
    try {
      const response = await fetch("/api/storage_3", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({}),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const newEmptyData = await response.json();

      setTrainingData([newEmptyData, ...trainingData]);
      setEditableKeys([newEmptyData.id, ...editableKeys]);

      if (actionRef.current) {
        actionRef.current.reload();
      }
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch("/api/delete_3", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const updatedData = trainingData.filter((item) => item.id !== id);
      setTrainingData(updatedData);

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
      title: "姓名",
      dataIndex: "name",
      width: 100,
    },
    {
      title: "部门",
      dataIndex: "department",
      width: 100,
    },
    {
      title: "出勤次数",
      dataIndex: "attendance_count",
      width: 100,
      search: false,
    },
    {
      title: "出勤成绩",
      dataIndex: "attendance_score",
      width: 100,
      search: false,
    },
    {
      title: "考试成绩",
      dataIndex: "exam_score",
      width: 100,
      search: false,
    },
    {
      title: "总成绩",
      dataIndex: "total_score",
      width: 100,
      search: false,
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
        pagination={{
          pageSize: 8,
        }}
        /* search={{
          labelWidth: 100,
          defaultCollapsed: false,
          span: 6,
          collapseRender: false,
        }}
        */
        request={async (params, _) => {
          console.log(params);
          const queryString = querystring.stringify(params);
          const apiUrl = `/api/query_3?${queryString}`;

          const data = await fetch(apiUrl, {
            method: "GET",
          });

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

export default TrainingManagement;
