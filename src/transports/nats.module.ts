import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { NATS_SERVICE, envs } from 'src/config';

@Module({
  imports: [
    ClientsModule.register([
      {
        // TODO: TCP ES ELC ANAL DE COMUNICACION CON EL MICROSERVICIO
        // DEFINIDO EN EL MICROSERVICIO

        // name: PRODUCT_SERVICE,
        //TODO: NATS CAMBIAR LA COMUINICACION DIRECTA CON PRODUCTS MS A NATS_SERVICE
        name: NATS_SERVICE,
        transport: Transport.NATS,
        options: {
          servers: envs.natsServers,
        },
      },
    ]),
  ],
  exports: [
    ClientsModule.register([
      {
        // TODO: TCP ES ELC ANAL DE COMUNICACION CON EL MICROSERVICIO
        // DEFINIDO EN EL MICROSERVICIO

        // name: PRODUCT_SERVICE,
        //TODO: NATS CAMBIAR LA COMUINICACION DIRECTA CON PRODUCTS MS A NATS_SERVICE
        name: NATS_SERVICE,
        transport: Transport.NATS,
        options: {
          servers: envs.natsServers,
        },
      },
    ]),
  ],
})
export class NatsModule {}
