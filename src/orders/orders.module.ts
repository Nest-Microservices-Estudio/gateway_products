import { Module } from '@nestjs/common';

// import { ClientsModule, Transport } from '@nestjs/microservices';
// import { ORDER_SERVICE } from 'src/config';
import { OrdersController } from './orders.controller';
import { NatsModule } from 'src/transports/nats.module';

@Module({
  controllers: [OrdersController],
  providers: [],

  imports: [
    // ClientsModule.register([
    //   {
    //     // TODO: TCP ES ELC ANAL DE COMUNICACION CON EL MICROSERVICIO
    //     // DEFINIDO EN EL MICROSERVICIO

    //     name: ORDER_SERVICE,
    //     transport: Transport.TCP,
    //     options: {
    //       // host: envs.ordersMicroserviceOptions.host,
    //       // port: envs.ordersMicroserviceOptions.port,
    //     },
    //   },
    // ]),
    NatsModule,
  ],
})
export class OrdersModule {

  constructor(){
    console.log('nats module desde orders module gateway');
    
  }
}
