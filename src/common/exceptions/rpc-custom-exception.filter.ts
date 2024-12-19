import { Catch, ArgumentsHost, ExceptionFilter } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';

// TODO: EXCEPTION FILTER
@Catch(RpcException)
export class RpcCustomExceptionFilter implements ExceptionFilter {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  catch(exception: RpcException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    const rpcError = exception.getError();

    console.log('rpcError', rpcError);

    // response.status(401).json({
    //   status: 401,
    //   message: 'Hola mundo soy un filtro de excepciones',
    // });

    if (rpcError.toString().includes('Empty response')) {
      return response.status(500).json({
        status: 404,
        message: rpcError
          .toString()
          // TOMA EL ERROR COMIENZA EN EL CARACTER 0 LLEGA AL PARENTESIS DESCUENTA 1 CARACTER ( OSEA EL PARENTESIS ) Y ESO ES EL MEBSAJE
          .substring(0, rpcError.toString().indexOf('(') - 1),
      });
    }

    if (
      typeof rpcError === 'object' &&
      'status' in rpcError &&
      'message' in rpcError
    ) {
      const status = isNaN(+rpcError.status) ? 400 : +rpcError.status;
      return response.status(status).json(rpcError);
    }

    response.status(400).json({
      status: 400,
      message: rpcError,
    });
  }
}
