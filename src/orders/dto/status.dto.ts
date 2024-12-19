import { IsEnum, IsOptional } from "class-validator";
import { OrderStatus, OrderStatusList } from "./enum/order.enum";

export class StatusDto {

    @IsOptional()
    @IsEnum(OrderStatusList,{
        message: `No es un status válido, los status son: ${OrderStatusList}`
    })
    status: OrderStatus
}