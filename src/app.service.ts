import { Injectable } from '@nestjs/common';
import { PostgresDataSource } from './app.datasource';
import { User } from './models/user.model';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
  async getUserByEmail(email: string) {
    const dataSource = PostgresDataSource;
    const userRepository = dataSource.getRepository(User);
    const user = await userRepository.findOne({
      where: { email: email }
    });
    return user;
  }
}
