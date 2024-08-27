import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

export type RepositoryDocument = Repository & Document;

@Schema()
export class Repository {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  owner: Types.ObjectId;

  @Prop({ required: true })
  author: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  url: string;

  @Prop({ required: true })
  stars: number;

  @Prop({ required: true })
  forks: number;

  @Prop({ required: true })
  openIssues: number;

  @Prop({ required: true })
  createdAt: Date;
}

export const RepositorySchema = SchemaFactory.createForClass(Repository);
