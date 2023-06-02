import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { HelloService } from './hello.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('/hello')
export class HelloController {
  constructor(private readonly HelloService: HelloService) {}

  @Get()
  findAll() {
    return this.HelloService.findAll();
  }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.HelloService.create(createUserDto);
  }
}
