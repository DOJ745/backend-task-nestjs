import { Controller, Get, Post, Put, Delete, Render, Body } from '@nestjs/common';
import { readdirSync } from 'fs';
import { AppService } from './app.service';
import { testUsers } from './models/users';
import { User } from "./models/user.model";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Render('index')
  // getHello(): string {
  //   return this.appService.getHello();
  // }
  index() { return { testUsers }; }

  @Post('/user-pdf')
  async generatePdfByEmail(@Body() body: {email: string}) {
    return await { message: 'PDF was saved successfully?', status: "true", "email": body.email };
  }

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