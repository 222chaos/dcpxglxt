import { Button, Dropdown, Space, Tag } from "antd";
import { EllipsisOutlined, PlusOutlined } from "@ant-design/icons";
import { useRef } from "react";
import ProTable from "@ant-design/pro-table";
import React from "react";

const TrainingPlanTable = () => {
  const actionRef = useRef();

  const trainingPlanData = [
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
  ];

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
    },
    {
      title: "培训计划名称",
      dataIndex: "name",
    },
    {
      title: "培训类型",
      dataIndex: "type",
      search: false,
    },
    {
      title: "培训专业",
      dataIndex: "specialty",
    },
    {
      title: "培训时间",
      dataIndex: "time",
      search: false,
    },
    {
      title: "培训人数",
      dataIndex: "participants",
      search: false,
    },
    {
      title: "完成情况",
      dataIndex: "completion",
    },
    {
      title: "操作",
      valueType: "option",
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
    console.log("编辑 ID:", id);
  };

  const handleDelete = (id) => {
    console.log("删除 ID:", id);
  };

  return (
    <div>
      <ProTable
        columns={columns}
        actionRef={actionRef}
        dataSource={trainingPlanData}
        rowKey="id"
        search={{
          labelWidth: "auto",
          defaultCollapsed: false, // 默认展开
          collapsed: false, // 设置是否手动折叠
        }}
        pagination={{
          pageSize: 5,
          onChange: (page) => console.log(page),
        }}
        headerTitle="培训计划列表"
        toolBarRender={() => [
          <Button key="button" icon={<PlusOutlined />} type="primary">
            新建
          </Button>,
        ]}
      />
    </div>
  );
};

export default TrainingPlanTable;
