import { Body, Controller, HttpException, HttpStatus, Post, Redirect, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { User } from "../models/user.model";
import { storage } from '../config/storage.config';
import { AppService } from '../app.service';

@Controller()
export class AuthController {
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
    const candidate = await this.appService.getUserByEmail(body.email);

    if(candidate !== null) {
      console.log("CANDIDATE has been found");
      throw new HttpException('User with such email already exists!', HttpStatus.BAD_REQUEST);
    }
    const user = new User(body.email, body.firstName, body.lastName, fileObj.filename);
    console.log(user);
    await user.save();
  }

  @Post('/sign-in')
  async signIn(@Body() body: {email: string}, @Res() res) {
    const user = await this.appService.getUserByEmail(body.email);

    if(user !== null){ 
      console.log("SIGN IN USER email - " + user.email);
      return res.redirect('/user/' + user.email);
    }
    throw new HttpException('Wrong email!', HttpStatus.BAD_REQUEST);
  }
}