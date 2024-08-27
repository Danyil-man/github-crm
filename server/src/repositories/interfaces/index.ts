import { PopulatedDoc, Types } from 'mongoose';
import { IUser } from 'src/user/interfaces';

export interface IRepository {
  owner: PopulatedDoc<IUser, Types.ObjectId>;
  author: string;
  name: string;
  url: string;
  stars: number;
  forks: number;
  openIssues: number;
  createdAt: Date;
}
