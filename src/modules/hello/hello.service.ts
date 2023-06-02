import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/hello.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ApiException } from 'src/common/filter/http-exception/api.exception';
import { ApiErrorCode } from 'src/common/enums/api-error-code.enum';

@Injectable()
export class HelloService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}
  async create(createUserDto: CreateUserDto) {
    return await this.userRepository.save(createUserDto);
  }
  async findAll() {
    // throw new HttpException('禁止访问', HttpStatus.FORBIDDEN);
    throw new ApiException('用户不存在', ApiErrorCode.USER_NOTEXIST);
    return await this.userRepository.find();
  }
  getHello(id: number): string {
    return 'Hello World!' + id;
  }
  postHello(name: string): string {
    return 'Hello World!' + name;
  }
}
