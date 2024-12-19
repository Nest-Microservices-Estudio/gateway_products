import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';

import { NatsModule } from 'src/transports/nats.module';

@Module({
  controllers: [ProductsController],
  providers: [],

  imports: [
    // TODO: NATS MOVEREMOS ESTO A UN MODULO ESPECIFICO
    // ClientsModule.register([
    //   {
    //     // TODO: TCP ES ELC ANAL DE COMUNICACION CON EL MICROSERVICIO
    //     // DEFINIDO EN EL MICROSERVICIO

    //     // name: PRODUCT_SERVICE,
    //     //TODO: NATS CAMBIAR LA COMUINICACION DIRECTA CON PRODUCTS MS A NATS_SERVICE
    //     name: NATS_SERVICE,
    //     transport: Transport.NATS,
    //     options: {
    //       servers: envs.natsServers
    //     },
    //   },
    // ]),
    NatsModule
  ],
})
export class ProductsModule {}
