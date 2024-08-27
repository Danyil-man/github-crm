import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  UsePipes,
  ValidationPipe,
  Request,
  Query,
} from '@nestjs/common';
import { RepositoriesService } from './repositories.service';
import { CreateRepositoryDto } from './dto/create-repository.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('repositories')
export class RepositoriesController {
  constructor(private readonly repositoriesService: RepositoriesService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe())
  create(@Body() createRepositoryDto: CreateRepositoryDto, @Request() req) {
    return this.repositoriesService.create(createRepositoryDto, req.user);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  findAllWithPagination(
    @Request() req,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 5,
  ) {
    return this.repositoriesService.findAllWithPagination(
      req.user,
      +page,
      +limit,
    );
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: string, @Request() req) {
    return this.repositoriesService.remove(id, req.user);
  }
}
