import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppService } from './app.service';
import { User } from './models/user.model';

@Module({
  imports: [
    // Postgres (runs in Docker container) config
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'test',
      password: 'test',
      database: 'test',
      entities: [User],
      logging: true,
      synchronize: true
    })
  ],
  controllers: [AppController, UserController],
  providers: [AppService],
})
export class AppModule {}
