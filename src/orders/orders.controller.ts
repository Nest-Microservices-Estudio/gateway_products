import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Inject,
  ParseUUIDPipe,
  Query,
  Patch,
} from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { NATS_SERVICE } from 'src/config';
import { OrderPaginationDto } from './dto/order-pagination.dto';
import { PaginationDto } from 'src/common';
import { StatusDto } from './dto/status.dto';
import { CreateOrderDto } from './dto/create-order.dto';
import { firstValueFrom } from 'rxjs';

@Controller('orders')
export class OrdersController {
  constructor(
    // TODO: LLAMAMOS A LA CONSTAMTE QUE ES NUESTRO PRODUCT SERVICE
    // PARA INYECTARLO EN EL CONSTRUCTOR
    // Y DECLARAMOS PRODUCTS CLIENTE DE TIPO CLIENTE PROXY
    // @Inject(ORDER_SERVICE) private readonly ordersClient: ClientProxy,
    @Inject(NATS_SERVICE) private readonly client: ClientProxy,
  ) {}

  @Post()
  create(@Body() createOrderDto: CreateOrderDto) {
    console.log('LLEGA AL GATEWAY ----->', createOrderDto);

    try {
      return this.client.send('createOrder', createOrderDto);
    } catch (error) {
      console.log('error desde gateway ----->', error);

      throw new RpcException(error);
    }
  }

  // esta trae ordenes solo por limite y take 
  @Get()
  async findAll(@Query() orderPaginationDto: OrderPaginationDto) {
    // console.log('findAllOrderDto desde gateway ----->', orderPaginationDto);

    // return orderPaginationDto
    try {
      // CONVIENE CUANDO SEA DEVOLVER ALGO DE BD UNA RESPUESTA O BIEN
      // DATA USAR FIRSTVALUEFROM QUE PERMITE CONVERTIR EL OBSERVABLE EN PROMESA
      // AL CONVERTIRLO EN PROMESA PUEDO USAR TRY CATCH PARA ATRAPAR EL ERROR Y EBNVIAR ALGO MAS PERSONALIZADO
      const orders = await firstValueFrom(
        this.client.send('findAllOrders', orderPaginationDto),
      );
      return orders;
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @Get('id/:id')
  // TODO: PARSEUUIDPIPE GATEWAY

  // UUID HAY QUE PASRLOS POR ESTE PARSE PIPE PARA QUE LOS RECONOZCA COMO UUID
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    console.log('id ----->', id);

    try {
      return this.client.send('findOneOrder', { id });
    } catch (error) {
      throw new RpcException(error);
    }
  }

  // esta trae ordenes por ele status y por paramns de paginacion
  @Get(':status')
  // TODO: PARSEUUIDPIPE GATEWAY

  // UUID HAY QUE PASRLOS POR ESTE PARSE PIPE PARA QUE LOS RECONOZCA COMO UUID
  async findByAllStatus(
    @Param() statusDto: StatusDto,
    @Query() paginationDto: PaginationDto,
  ) {
    console.log('status ----->', statusDto);
    console.log('paginationDto ----->', paginationDto);
    console.log('jerjeje ----->', NATS_SERVICE);

    try {

      const orders = await firstValueFrom(
        this.client.send('findAllOrders', {
          ...paginationDto,
          status: statusDto.status,
        }),
      );
      return orders

      
    } catch (error) {
      console.log('error findByAllStatus----->', error);

      throw new RpcException(error);
    }
  }
F
  @Patch(':id')
  changeOrderStatus(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() statusDto: StatusDto,
  ) {
    try {
      //
      return this.client.send('changeOrderStatus', {
        id,
        status: statusDto.status,
      });
    } catch (error) {
      throw new RpcException(error);
    }
  }
}
