import { Controller, Get, Post, Put, Delete, Render, Body, UseInterceptors, UploadedFile, Redirect, HttpException, HttpStatus } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class UserController {
  constructor(private readonly appService: AppService) {}

  @Put('/user')
  updateUser(){}

  @Delete('/user')
  deleteUser(){}
}