import { Module } from '@nestjs/common';
import { AppController } from './controllers/app.controller';
import { UserController } from './controllers/user.controller';
import { AuthController } from './controllers/auth.controller';
import { AppService } from './app.service';

@Module({
  controllers: [AppController, UserController, AuthController],
  providers: [AppService],
})

export class AppModule {}
