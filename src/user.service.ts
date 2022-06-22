import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './models/user.model';
//import DatabaseFilesService from '../databaseFiles/databaseFiles.services';
 
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>
  ) {}
 
  async addPdf(pdfBuffer: Buffer) {
    //const pdf = await this.databaseFilesService.uploadDatabaseFile(pdfBuffer);
    //await this.usersRepository.update();
    //return pdf;
  }

  async uploadDatabaseFile(dataBuffer: Buffer) {
    // const newFile = await this.databaseFilesRepository.create( {data: dataBuffer} )
    // await this.databaseFilesRepository.save(newFile);
    // return newFile;
  }

}