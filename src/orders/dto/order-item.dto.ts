import { Type } from "class-transformer";
import { IsNumber, IsPositive } from "class-validator";

export class OrderItemDto {

    // el id de los productos es numerico

    @IsNumber()
    @IsPositive()
    productId: number;

    @IsNumber()
    @IsPositive()
    quantity: number;

    @IsNumber()
    @IsPositive()
    @Type(() => Number)
    price: number;


 
}

