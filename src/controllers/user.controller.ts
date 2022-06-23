import { Controller, Get, Post, Put, Delete, Render, Body, UseInterceptors, UploadedFile, Redirect, HttpException, HttpStatus, Res } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { storage } from '../config/storage.config';
import { AppService } from '../app.service';
import * as fs from 'fs';

@Controller()
export class UserController {
  constructor(private readonly appService: AppService) {}

  @Put('/user')
  @UseInterceptors(FileInterceptor("image", {storage}))
  async updateUser(
    @Res() res, 
    @UploadedFile() fileObj,
    @Body() body: {
    oldEmail: string;
    email: string;
    firstName: string;
    lastName: string;
  }): Promise<void>{
    const user = await this.appService.getUserByEmail(body.oldEmail);
    user.email = body.email;
    user.firstName = body.firstName;
    user.lastName = body.lastName;
    user.image = fileObj.filename;

    await user.save();
    return res.send({
      message: "User has been successfuly updated",
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      image: user.image
    });
  }

  @Delete('/user')
  async deleteUser(@Body() body: {email: string;}, @Res() res) {
    console.log("DELETE BODY: " + body.email);
    const user = await this.appService.getUserByEmail(body.email);
    // Deleting image
    await fs.unlink(`public/uploads/${user.image}`, (err) => {
      if (err) {
        console.error(err);
        return res.send({message: "Cannot delete picture!"});;
       }
    });
    await user.remove();
    return res.send({message: "User was deleted successfuly!"});
  }
}