import { Controller, Get, Post, Render, Body, Param } from '@nestjs/common';
import { AppService } from './app.service';
import { User } from "./models/user.model";
import { PostgresDataSource } from './app.datasource';


@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Render('index')
  async index() { 
    const dataSource = PostgresDataSource;
    const userRepository = dataSource.getRepository(User);
    return { users: await userRepository.find() };
  }

  @Get('/user/:email')
  @Render('user_data')
  async userData(@Param('email') email: string){
    const dataSource = PostgresDataSource;
    const userRepository = dataSource.getRepository(User);
    const user = await userRepository.findOne({
      where: { email: email }
    });
    console.log("EMAIL - " + user.email);
    return user;
  }

  @Get('/sign-up')
  @Render('sign_up')
  signUp(){}

  @Post('/user-pdf')
  async generatePdfByEmail(@Body() body: {email: string}) {
    return await { message: 'PDF was saved successfully?', status: "true", "email": body.email };
  }
}