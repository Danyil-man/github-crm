export type IRepository = {
  _id: string;
  owner: string;
  author: string;
  name: string;
  url: string;
  stars: number;
  forks: number;
  openIssues: number;
  createdAt: Date;
};

export type IRepositoryDto = {
  path: string;
};

export type IRepositoryResponse = {
  repositories: IRepository[];
  total: number;
};
