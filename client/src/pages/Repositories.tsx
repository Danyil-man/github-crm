import { FC, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { RootState } from "../store/redux";
import { RepositoryService } from "../services/repository.service";
import {
  getAllRepositories,
  removeRepoById,
} from "../store/repository/repositorySlice";
import { Button, Pagination, Table } from "antd";
import { formatDate } from "../helpers/formatDate";

interface IRepositories {
  limit?: number;
}

const Repositories: FC<IRepositories> = ({ limit = 5 }) => {
  const dispatch = useAppDispatch();
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
    </div>
  );
};

export default Repositories;
