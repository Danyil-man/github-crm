import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { UserSchema } from './user/entities/user.entity';
import { RepositoriesModule } from './repositories/repositories.module';
import { RepositorySchema } from './repositories/entities/repository.entity';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: `mongodb+srv://demyanyuk76:${configService.get('DB_PASSWORD')}@cluster0.jkm8o.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`,
      }),
      inject: [ConfigService],
    }),
    MongooseModule.forFeature([
      {
        name: 'User',
        schema: UserSchema,
      },
      { name: 'Repository', schema: RepositorySchema },
    ]),
    AuthModule,
    UserModule,
    RepositoriesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
