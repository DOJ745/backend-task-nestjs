import { Controller, Get, Post, Put, Delete, Render, Body, Redirect, Res, HttpException, HttpStatus, Param } from '@nestjs/common';
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

  @Post('/sign-in')
  async signIn(@Body() body: {email: string}, @Res() res) {
    const dataSource = PostgresDataSource;
    const userRepository = dataSource.getRepository(User);
    const user = await userRepository.findOne({
      where: { email: body.email }
    });
    if(user !== null){ 
      console.log("SIGN IN USER email - " + user.email);
      return res.redirect('/user/' + user.email);
    }
    throw new HttpException('Wrong email!', HttpStatus.BAD_REQUEST);
  }

  @Post('/user-pdf')
  async generatePdfByEmail(@Body() body: {email: string}) {
    return await { message: 'PDF was saved successfully?', status: "true", "email": body.email };
  }
}