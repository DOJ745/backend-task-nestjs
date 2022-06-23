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
 
  async addPdf(pdfBuffer: Buffer) {}

  async uploadDatabaseFile(dataBuffer: Buffer) {}

}