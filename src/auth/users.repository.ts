import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { User } from './user.entity';

@EntityRepository(User)
export class UsersRepository extends Repository<User> {
  async createUser(authCredentials: AuthCredentialsDto): Promise<void> {
    const { username, password } = authCredentials;
    const user = this.create({ username, password });
    try {
      await this.save(user);
    } catch (err) {
      console.log(err.code);
      // duplicate username error code from postgres
      if (err.code === '23505') {
        throw new ConflictException(err.detail);
      } else {
        throw new InternalServerErrorException();
      }
    }
  }
}
