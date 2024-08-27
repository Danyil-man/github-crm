import { IsNotEmpty, IsString } from 'class-validator';

export class CreateRepositoryDto {
  @IsNotEmpty()
  @IsString()
  path: string;
}
