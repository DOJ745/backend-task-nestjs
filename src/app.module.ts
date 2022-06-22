import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { UserController } from './user.controller';
import { AuthController } from './auth.controller';
import { AppService } from './app.service';

@Module({
  controllers: [AppController, UserController, AuthController],
  providers: [AppService],
})

export class AppModule {}
