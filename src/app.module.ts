import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { MyWebSocketModule } from './websocket/my-websocket.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      autoLoadEntities: true, //自动加载实体
      host: 'localhost',
      port: 3306, // 端口号
      username: 'root', // 用户名
      password: 'admin123', // 密码
      database: 'easyestadmin', //数据库名
      synchronize: true, //是否自动同步实体文件,生产环境建议关闭
    }),
    UserModule,
    AuthModule,
    MyWebSocketModule,
  ],
  providers: [],
})
export class AppModule {}
