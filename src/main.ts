import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { RpcCustomExceptionFilter } from './common';
import { envs } from './config';

async function bootstrap() {
  const logger = new Logger('Main-Gateway');

  const app = await NestFactory.create(AppModule);

    // TODO: GATEWAY PONER API COMO PREFIJO
  app.setGlobalPrefix('api');
  
  // TODO: ESTO ES PARA QUE LOS PARAMETROS QUE SE RECIBAN EN LOS ENDPOINTS SEAN VALIDADOS
  // Y ASI FINCIONARA CLASS VALIDATOR Y CLAS TRANSFORER
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  // TODO: EXCEPTION CUSTOM FILTER
  app.useGlobalFilters(new RpcCustomExceptionFilter())
  
  //siempre este al final
  await app.listen(envs.port);

  console.log('hola mundo - CUARTO cammbio');
  
  logger.log(`Gateway is running on: ${envs.port}`);
}
bootstrap();
