import React, { useRef, useState } from "react";
import { Button } from "antd";
import ProTable from "@ant-design/pro-table";
import querystring from "querystring";

const DepartmentManagement = () => {
  const actionRef = useRef();

  const [editableKeys, setEditableKeys] = useState([]);
  const [departmentData, setDepartmentData] = useState([]);

  const handleSave = async (rowKeys, newData) => {
    console.log(newData);
    try {
      const response = await fetch(`/api/update_4`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newData),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const updatedData = departmentData.map((item) => {
        if (item.id === newData.id) {
          return newData;
        }
        return item;
      });

      setDepartmentData(updatedData);
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
      const response = await fetch("/api/storage_4", {
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

      setDepartmentData([newEmptyData, ...departmentData]);
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
      const response = await fetch("/api/delete_4", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const updatedData = departmentData.filter((item) => item.id !== id);
      setDepartmentData(updatedData);

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
      title: "部门名称",
      dataIndex: "departmentname",
      width: 120,
    },
    {
      title: "部门编号",
      dataIndex: "departmentid",
      width: 100,
      search: false,
    },
    {
      title: "部门简称",
      dataIndex: "departmentabbreviation",
      width: 100,
      search: false,
    },
    {
      title: "联系方式",
      dataIndex: "contactinfo",
      width: 120,
      search: false,
    },
    {
      title: "上级部门",
      dataIndex: "superiordepartment",
      width: 120,
      search: false,
    },
    {
      title: "上级部门编号",
      dataIndex: "superiordepartmentid",
      width: 120,
      search: false,
    },
    {
      title: "备注",
      dataIndex: "remark",
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
        search={{
          labelWidth: 100,
          defaultCollapsed: false,
          span: 6,
          collapseRender: false,
        }}
        request={async (params, _) => {
          console.log(params);
          const queryString = querystring.stringify(params);
          const apiUrl = `/api/query_4?${queryString}`;

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

export default DepartmentManagement;
