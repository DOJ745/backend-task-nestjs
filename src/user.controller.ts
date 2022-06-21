import { Controller, Get, Post, Put, Delete, Render, Body, UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AppService } from './app.service';
import { testUsers } from './models/users';
import { User } from "./models/user.model";
import { multerOptions } from 'src/config/multer.config';

@Controller()
export class UserController {
  constructor(private readonly appService: AppService) {}

  @Post('/user')
  async addUser(@Body() body: {
    email: string;
    firstName: string; 
    lastName: string;
    image: string
  }): Promise<void>{
    const user = new User(body.email, body.firstName, body.lastName, body.image);
    console.log(user)
    await user.save();
  }
}