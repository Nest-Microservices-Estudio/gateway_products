import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { envs, PRODUCT_SERVICE } from 'src/config';

@Module({
  controllers: [ProductsController],
  providers: [],

  imports: [
    ClientsModule.register([
      {
        // TODO: TCP ES ELC ANAL DE COMUNICACION CON EL MICROSERVICIO
        // DEFINIDO EN EL MICROSERVICIO

        
        name: PRODUCT_SERVICE,
        transport: Transport.TCP,
        options: {
          host: envs.productsMicroserviceOptions.host,
          port: envs.productsMicroserviceOptions.port,
        },
      },
    ]),
  ],
})


export class ProductsModule {


  
}
