import { Controller, Get, Post, Render, Body, Param, Res, HttpStatus } from '@nestjs/common';
import { AppService } from '../app.service';
import { User } from "../models/user.model";
import { PostgresDataSource } from '../app.datasource';
import * as PDFDocument from 'pdfkit';

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
    const user = await this.appService.getUserByEmail(email);
    return user;
  }

  @Get('/sign-up')
  @Render('sign_up')
  signUp(){}

  @Get('/user-pdf/:email')
  async showPdf(@Param('email') email: string, @Res() res){
    const user = await this.appService.getUserByEmail(email);
    if(user !== null){
      const buffer = user.pdf;

      res.set({
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename=user.pdf',
        'Content-Length': buffer.length,
      });
      return res.end(buffer);
    }
    return res.status(HttpStatus.BAD_REQUEST).send({message: "No such user!"});

  }

  @Post('/user-pdf')
  async generatePdfByEmail(@Body() body: {email: string}, @Res() res) {
    const user = await this.appService.getUserByEmail(body.email);
    
    if(user !== null){
      const pdfBuffer: Buffer = await new Promise(resolve => {
        const doc = new PDFDocument({size: 'A4'});

        doc.fontSize(24).text(`${user.firstName} ${user.lastName}`, 100, 80);
        doc.image(`public/uploads/${user.image}`, {
          fit: [250, 250],
          align: 'center',
          valign: 'center'
        });
        doc.end();

        const buffer = []
        doc.on('data', buffer.push.bind(buffer))
        doc.on('end', () => {
          const data = Buffer.concat(buffer)
          resolve(data)
        });
      });
      user.pdf = pdfBuffer;
      await user.save();

      return res.send({message: "PDF has been saved?", status: "true"});
    }
    return res.send({message: "PDF has been saved?", status: "false"});
  }
}