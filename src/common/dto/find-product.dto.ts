import { IsInt } from 'class-validator';
import { Type } from 'class-transformer';

export class FindProductDto {
  @IsInt({ message: 'El id debe ser un número entero' })
  @Type(() => Number) // Convierte el valor de id a número
  id: number;
}