import { PartialType } from '@nestjs/mapped-types';
import { CreateProductDto } from './create-product.dto';


// TODO: PARTIALTYPE EXPLICADO

// ESTO HACE TODAS LAS PROPIEDADES DEL CREATEPRODUCT OPCIONALES
export class UpdateProductDto extends PartialType(CreateProductDto) {
    

}
