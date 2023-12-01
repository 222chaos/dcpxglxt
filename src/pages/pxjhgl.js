import { Button, Dropdown, Space, Tag } from "antd";
import { EllipsisOutlined, PlusOutlined } from "@ant-design/icons";
import { useRef } from "react";
import ProTable from "@ant-design/pro-table";

const TrainingPlanTable = () => {
  const actionRef = useRef();

  const trainingPlanData = [
    // 在这里添加一些假数据用于展示
    // 根据你的实际需求替换这些数据
    {
      id: 1,
      year: 2023,
      name: "2023年度培训计划",
      type: "在线培训",
      specialty: "技术培训",
      time: "2023-12-01",
      participants: 50,
      completion: "进行中",
    },
    // 添加更多培训计划数据
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
      copyable: true,
      ellipsis: true,
      tip: "标题过长会自动收缩",
    },
    {
      title: "培训类型",
      dataIndex: "type",
    },
    {
      title: "培训专业",
      dataIndex: "specialty",
    },
    {
      title: "培训时间",
      dataIndex: "time",
    },
    {
      title: "培训人数",
      dataIndex: "participants",
    },
    {
      title: "完成情况",
      dataIndex: "completion",
      render: (_, record) => (
        <Space>
          <Tag
            color={record.completion === "进行中" ? "processing" : "success"}
          >
            {record.completion}
          </Tag>
        </Space>
      ),
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
    // 编辑逻辑
    console.log("编辑 ID:", id);
  };

  const handleDelete = (id) => {
    // 删除逻辑
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
          <Dropdown
            key="menu"
            menu={{
              items: [
                {
                  label: "1st item",
                  key: "1",
                },
                {
                  label: "2nd item",
                  key: "2",
                },
                {
                  label: "3rd item",
                  key: "3",
                },
              ],
            }}
          >
            <Button>
              <EllipsisOutlined />
            </Button>
          </Dropdown>,
        ]}
      />
    </div>
  );
};

export default TrainingPlanTable;
