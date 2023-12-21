import React, { useRef, useState } from "react";
import { Button } from "antd";
import ProTable from "@ant-design/pro-table";
import querystring from "querystring";

const EmployeeManagement = () => {
  const actionRef = useRef();

  const [editableKeys, setEditableKeys] = useState([]);
  const [employeeData, setEmployeeData] = useState([]);

  const handleSave = async (rowKeys, newData) => {
    console.log(newData);
    try {
      const response = await fetch(`/api/update_2`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newData),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const updatedData = employeeData.map((item) => {
        if (item.id === newData.id) {
          return newData;
        }
        return item;
      });

      setEmployeeData(updatedData);
      setEditableKeys([]);
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
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
      const response = await fetch("/api/storage_2", {
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

      setEmployeeData([newEmptyData, ...employeeData]);
      setEditableKeys([newEmptyData.id, ...editableKeys]);

      if (actionRef.current) {
        actionRef.current.reload();
      }
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
      // 处理错误情况，例如向用户显示错误消息
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch("/api/delete_2", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const updatedData = employeeData.filter((item) => item.id !== id);
      setEmployeeData(updatedData);

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
      title: "身份证号",
      dataIndex: "id_card_number",
      width: 150,
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
          const apiUrl = `/api/query_2?${queryString}`;

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

export default EmployeeManagement;
