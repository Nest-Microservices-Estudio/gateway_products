import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { envs } from './config';
import { Logger, ValidationPipe } from '@nestjs/common';

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
  
  //siempre este al final
  await app.listen(envs.port);
  logger.log(`Server is running on: ${envs.port}`);
}
bootstrap();
