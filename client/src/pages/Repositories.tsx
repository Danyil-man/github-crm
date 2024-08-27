import { FC, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { RootState } from "../store/redux";
import { RepositoryService } from "../services/repository.service";
import {
  getAllRepositories,
  removeRepoById,
} from "../store/repository/repositorySlice";
import {
  Button,
  Form,
  Input,
  Modal,
  notification,
  Pagination,
  Table,
} from "antd";
import { formatDate } from "../helpers/formatDate";

interface IRepositories {
  limit?: number;
}

const Repositories: FC<IRepositories> = ({ limit = 5 }) => {
  const dispatch = useAppDispatch();
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [form] = Form.useForm();
  const { repositories, total } = useAppSelector(
    (state: RootState) => state.repository
  );
  const [currentPage, setCurrentPage] = useState<number>(1);

  const handleDelete = async (id: string) => {
    await RepositoryService.removeRepoById(id);
    dispatch(removeRepoById(id));
  };

  const handleChangePage = async (page: number) => {
    const response = await RepositoryService.getAllReposWithPagination(
      page,
      limit
    );
    dispatch(getAllRepositories(response));
    setCurrentPage(page);
  };

  const handleAddRepository = async (values: { repoPath: string }) => {
    try {
      await RepositoryService.addNewRepository(values.repoPath);
      notification.success({
        message: "Repository Added",
        description: `Repository ${values.repoPath} has been added successfully.`,
      });
      form.resetFields();
      setIsModalVisible(false);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      notification.error({
        message: "Add Repository Failed",
        description: `Failed to add repository: ${e?.response?.data.message}`,
      });
    }
  };

  const columns = [
    {
      title: "Project Owner",
      dataIndex: "author",
      key: "author",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "URL",
      dataIndex: "url",
      key: "url",
      render: (text: string) => (
        <a href={text} target="_blank" rel="noopener noreferrer">
          {text}
        </a>
      ),
    },
    {
      title: "Stars",
      dataIndex: "stars",
      key: "stars",
    },
    {
      title: "Forks",
      dataIndex: "forks",
      key: "forks",
    },
    {
      title: "Open Issues",
      dataIndex: "openIssues",
      key: "openIssues",
    },
    {
      title: "Creation Date",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (date: Date) => {
        const formattedDate = new Date(date).getTime() / 1000;
        return <p>{formatDate(formattedDate)}</p>;
      },
    },
    {
      title: "Actions",
      key: "actions",
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      render: (_: any, record: { _id: string }) => (
        <Button type="primary" danger onClick={() => handleDelete(record._id)}>
          Delete
        </Button>
      ),
    },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await RepositoryService.getAllReposWithPagination(
          currentPage,
          limit
        );
        dispatch(getAllRepositories(data));
      } catch (error) {
        console.error("Failed to fetch repositories:", error);
      }
    };

    fetchData();
  }, [dispatch, currentPage, limit]);

  return (
    <div className="repositories-page">
      <Button
        type="primary"
        onClick={() => setIsModalVisible(true)}
        style={{ marginBottom: 16 }}
      >
        Add Repository
      </Button>
      <Table
        dataSource={repositories}
        columns={columns}
        rowKey="_id"
        pagination={false}
        style={{ marginBottom: 16 }}
      />
      <Pagination
        current={currentPage}
        pageSize={limit}
        total={total}
        onChange={handleChangePage}
        showSizeChanger={false}
      />
      <Modal
        title="Add New Repository"
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        <Form form={form} onFinish={handleAddRepository} layout="vertical">
          <Form.Item
            name="repoPath"
            label="Repository Path"
            rules={[
              { required: true, message: "Please input the repository path!" },
            ]}
          >
            <Input placeholder="e.g., owner/repository_name" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Add Repository
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Repositories;
