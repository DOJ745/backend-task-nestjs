import { Controller, Get, Post, Put, Delete, Render, Body, UseInterceptors, UploadedFile, Redirect, HttpException, HttpStatus } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AppService } from './app.service';
import { User } from "./models/user.model";
import { PostgresDataSource } from './app.datasource';
import { storage } from './config/storage.config';

@Controller()
export class UserController {
  constructor(private readonly appService: AppService) {}

  @Post('/sign-up')
  @UseInterceptors(FileInterceptor("image", {storage}))
  @Redirect('/', 301)
  async addUser(
    @UploadedFile() fileObj,
    @Body() body: {
    email: string;
    firstName: string; 
    lastName: string;
  }): Promise<void> {
    const dataSource = PostgresDataSource;
    const userRepository = dataSource.getRepository(User);
    const candidate = await userRepository.findOne({
      where: { email: body.email }
    });

    if(candidate !== null) {
      console.log("CANDIDATE has been found");
      throw new HttpException('User with such email already exists!', HttpStatus.BAD_REQUEST)
    }
    const user = new User(body.email, body.firstName, body.lastName, fileObj.filename);
    console.log(user);
    await user.save();
  }
}