import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ApiException } from 'src/common/filter/http-exception/api.exception';
import { ApiErrorCode } from 'src/common/enums/api-error-code.enum';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}
  async create(createUserDto: CreateUserDto) {
    const { username } = createUserDto;

    const existUser = await this.userRepository.findOne({
      where: { username },
    });

    if (existUser)
      throw new ApiException('用户已存在', ApiErrorCode.USER_EXIST);
    try {
      console.log(createUserDto);

      const newUser = await this.userRepository.create({
        ...createUserDto,
        avatar: `https://api.multiavatar.com/Binx%${Math.floor(
          Math.random() * 50000,
        )}.png`,
      });
      console.log(newUser);
      await this.userRepository.save(newUser);
      return '注册成功';
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findAll() {
    const users = await this.userRepository.find();
    console.log(users);

    return users;
  }

  async findOne(username: string) {
    const user = await this.userRepository.findOne({
      where: { username },
    });

    if (!user) throw new HttpException('用户名不存在', HttpStatus.BAD_REQUEST);
    return user;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
