import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateRepositoryDto } from './dto/create-repository.dto';
import { IUser } from 'src/user/interfaces';
import { InjectModel } from '@nestjs/mongoose';
import { Repository, RepositoryDocument } from './entities/repository.entity';
import { Model, Types } from 'mongoose';
import { User, UserDocument } from 'src/user/entities/user.entity';
import axios from 'axios';

@Injectable()
export class RepositoriesService {
  constructor(
    @InjectModel(Repository.name)
    private readonly repositoryModel: Model<RepositoryDocument>,
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
  ) {}
  async create(createRepositoryDto: CreateRepositoryDto, currentUser: IUser) {
    const githubRepoData = await this.fetchGitHubRepoData(
      createRepositoryDto.path,
    );

    const user = await this.userModel.findById(currentUser._id);
    if (!user) {
      throw new NotFoundException(`User with id ${currentUser._id} not found`);
    }

    let newRepository;
    try {
      newRepository = await this.repositoryModel.create({
        owner: user._id,
        author: githubRepoData.owner,
        name: githubRepoData.name,
        url: githubRepoData.url,
        stars: githubRepoData.stars,
        forks: githubRepoData.forks,
        openIssues: githubRepoData.openIssues,
        createdAt: githubRepoData.creationDate,
      });
    } catch (e) {
      throw new BadRequestException(
        'The error occurred with adding repository',
      );
    }

    return newRepository;
  }

  async findAllWithPagination(currentUser: IUser, page: number, limit: number) {
    const offset = (page - 1) * limit;
    const userObjectId = new Types.ObjectId(currentUser._id);
    const repositories = await this.repositoryModel
      .find({ owner: userObjectId })
      .sort({ createdAt: -1 })
      .skip(offset)
      .limit(limit)
      .lean();

    const total = await this.repositoryModel.countDocuments({
      owner: userObjectId,
    });

    return { repositories, total };
  }

  async remove(id: string, user: IUser) {
    const repository = await this.repositoryModel.findById(id);
    if (!repository) {
      throw new NotFoundException('Repository not found.');
    }

    const isUserAuthor = repository.owner.toString() === user._id;
    if (isUserAuthor) {
      await this.repositoryModel.findByIdAndDelete(id);
    } else {
      throw new BadRequestException('You are not author.');
    }
  }

  private async fetchGitHubRepoData(repoPath: string) {
    try {
      const response = await axios.get(
        `https://api.github.com/repos/${repoPath}`,
        {
          headers: {
            Authorization: `Bearer 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`,
            'Content-Type': 'application/json',
          },
        },
      );

      const data = response.data;
      return {
        owner: data.owner.login,
        name: data.name,
        url: data.html_url,
        stars: data.stargazers_count,
        forks: data.forks_count,
        openIssues: data.open_issues_count,
        creationDate: data.created_at,
      };
    } catch (error) {
      throw new BadRequestException('Error fetching data from GitHub API');
    }
  }
}
