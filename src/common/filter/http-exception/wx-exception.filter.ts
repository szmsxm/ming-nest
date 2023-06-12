import {
  Catch,
  ArgumentsHost,
  HttpException,
  WsExceptionFilter,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { ApiException } from './api.exception';
import { ServerResponseWrapper } from '../../server-response-wrapper';
@Catch(HttpException)
export class WsServiceExceptionFilter implements WsExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    let responseWrapper: ServerResponseWrapper;
    if (exception instanceof ApiException) {
      // 业务层Exception
      responseWrapper = {
        returnCode: String(exception.getErrorCode()),
        errorMessage: exception.getErrorMessage(),
      };
    } else {
      // 其他错误
      responseWrapper = {
        returnCode: 'IM9999',
        errorMessage: 'server unknown error: ' + exception.message,
      };
    }
    // 对异常进行封装以后，需要让框架继续进行调用处理，才能正确的响应给客户端
    // 此时，需要提取到callback这个函数
    // 参考：https://stackoverflow.com/questions/61795299/nestjs-return-ack-in-exception-filter
    const callback = host.getArgByIndex(2);
    if (callback && typeof callback === 'function') {
      callback(responseWrapper);
    }
  }
}
