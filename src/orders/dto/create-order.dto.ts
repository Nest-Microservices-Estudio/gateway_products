// import { OrderStatus } from '@prisma/client';
// import { IsBoolean, IsEnum, IsNumber, IsOptional, IsPositive } from 'class-validator';
// import { OrderStatusList } from './enum/order.enum';

import { Type } from "class-transformer";
import { ArrayMinSize, IsArray, ValidateNested } from "class-validator";
import { OrderItemDto } from "./order-item.dto";

export class CreateOrderDto {
  // @IsNumber()
  // @IsPositive()
  // totalAmount: number;

  // @IsNumber()
  // @IsPositive()
  // totalItems: number;
  // // TODO: TIPADO DTO
  // //   podemos tipar con los esquemas de prisma
  // //     al hacer la migracion de OrderStatus a la bd
  // //     se crea automaticamente un tipado por lo que podemos llamarlo aca

  // @IsEnum(OrderStatusList, {
  //   message: `Los status posibles son: ${OrderStatusList.join(
  //     ', ',
  //   )}`,
  // })
  // @IsOptional()
  // status: OrderStatus = OrderStatus.PENDING;

  // @IsOptional()
  // @IsBoolean()
  // paid: boolean = false;

  // TODO: CREACION DE ORDEN
  // CREAREMOS LA REAL ORDEN CON LOS ORDERITEMS CORRRESPONDIENDTE
@IsArray()

// al menos tiene que tener un elemento
@ArrayMinSize(1)

// validamos que cada elemento del arreglo sea un objeto
@ValidateNested({ each: true })

// cada elemento sera del tipo OrderItemDto
@Type(() => OrderItemDto)
  items: OrderItemDto[]
}
