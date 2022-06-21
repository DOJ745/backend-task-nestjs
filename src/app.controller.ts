import { Controller, Get, Post, Put, Delete, Render, Body, UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AppService } from './app.service';
import { testUsers } from './models/users';
import { User } from "./models/user.model";
import { multerOptions } from 'src/config/multer.config';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Render('index')
  index() { return { testUsers }; }

  @Get('/sign-up')
  @Render('sign_up')

  @Post('/user-pdf')
  async generatePdfByEmail(@Body() body: {email: string}) {
    return await { message: 'PDF was saved successfully?', status: "true", "email": body.email };
  }

  @Post('/upload-img')
  @UseInterceptors(FileInterceptor('file', multerOptions))
  async upload( @UploadedFile() file) {
    console.log(file)
    console.log("FILENAME: " + file.filename)
  }
}