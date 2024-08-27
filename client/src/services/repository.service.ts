import { instanceApi } from "../api/axios.api";
import { IRepositoryResponse } from "../types/IRepository";

export const RepositoryService = {
  async getAllReposWithPagination(
    page: number,
    limit: number
  ): Promise<IRepositoryResponse> {
    const { data } = await instanceApi.get<IRepositoryResponse>(
      `/repositories?page=${page}&limit=${limit}`
    );
    return data;
  },
  async removeRepoById(id: string) {
    const { data } = await instanceApi.delete(`/repositories/${id}`);
    return data;
  },
};
