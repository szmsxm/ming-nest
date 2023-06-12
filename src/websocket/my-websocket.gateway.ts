import {
  HttpException,
  HttpStatus,
  UseFilters,
  UseInterceptors,
} from '@nestjs/common';
import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { WsServiceExceptionFilter } from 'src/common/filter/http-exception/wx-exception.filter';
import { WsServiceResponseInterceptor } from 'src/common/interceptor/WebSocket/ws-service.response.interceptor';

@UseInterceptors(new WsServiceResponseInterceptor())
@UseFilters(new WsServiceExceptionFilter())
@WebSocketGateway(9892, {
  cors: true,
})
export class MyWebSocketGateway {
  @SubscribeMessage('hello')
  hello(client: Socket, reqData: { name: string; chatName: string }) {
    if (!reqData || !reqData.name) {
      throw new HttpException('连接错误', HttpStatus.UNAUTHORIZED);
    }
    console.log(JSON.stringify(reqData));
    console.log(client.broadcast.emit('hello' + reqData.chatName, reqData));
    console.log('111');

    return 'received reqData';
  }
}
