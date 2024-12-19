import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { PaginationDto } from 'src/common';
import { NATS_SERVICE } from 'src/config';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('products')
export class ProductsController {
  constructor(
    // TODO: LLAMAMOS A LA CONSTAMTE QUE ES NUESTRO PRODUCT SERVICE
    // PARA INYECTARLO EN EL CONSTRUCTOR
    // Y DECLARAMOS PRODUCTS CLIENTE DE TIPO CLIENTE PROXY
    // @Inject(PRODUCT_SERVICE) private readonly productsClient: ClientProxy,
    
    // CAMBIAMOS ACA PARA USAR SOLO NATS
    @Inject(NATS_SERVICE) private readonly client: ClientProxy,
  ) {}

  @Post()
  createProduct(@Body() createProductDto: CreateProductDto) {
    try {
      return this.client.send(
   'createOrder',
        createProductDto,
      );
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @Get()
  findAllProducts(@Query() paginationDto: PaginationDto) {
    console.log('FIND ALLLLLLLLL PRODUCCCCCTSSSSSSSS GATEWAY');
    
    // TODO: COMUNCACION CON ENDPOINT DE MICROSERVICIO
    // colocamos el mismo nombre que pusimos al messagepattern en el microservicio

    // EL SEGUNDO ARGUMENTO ES EL PAYLOAD
    return this.client.send(
      ('find_all_products'),
      paginationDto,
    );
  }
  @Get(':id')
  async findOne(@Param('id') id: string) {
    // return this.productsClient.send({ cmd: 'find_one_product' }, { id }).pipe(
    //   catchError((err) => {
    //     throw new RpcException(err);
    //   }),
    // );

    try {
      const product = await firstValueFrom(
        this.client.send('find_one_product', { id }),
      );
      return product;
    } catch (error) {
      console.log('error -> ', error);

      throw new RpcException(error);
    }
  }

  // TODO: YA NO USAREMOS EL ID DEL CUERPO DEL UPDATE COMO SI LO HACEMOS EN EL MICROSERVICIO 
  // YA QUE ESTE SE ENVIARA EN EL PARAMETRO DE LA URL 
  // Y LUEGO DESTRUCTURAMOS Y ENVIAMOS POR SEPARADO EL ID Y EL RESTO DE LOS DATOS
  // PERO EN UN UNICO OBJETO

  @Patch(':id')
  updateProduct(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    try {
      return this.client.send(
        'update_product',
        {
          id,
          ...updateProductDto,
        },
      );
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @Delete(':id')
  deleteProduct(@Param('id') id: number) {
    console.log('id desde controller gateway--->', id);

    try {
      return this.client.send('delete_product', { id });
    } catch (error) {
      throw new RpcException(error);
    }
  }

  
}
