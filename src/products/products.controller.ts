import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError } from 'rxjs';
import { PaginationDto } from 'src/common';
import { PRODUCT_SERVICE } from 'src/config';

@Controller('products')
export class ProductsController {
  constructor(
    // TODO: LLAMAMOS A LA CONSTAMTE QUE ES NUESTRO PRODUCT SERVICE
    // PARA INYECTARLO EN EL CONSTRUCTOR
    // Y DECLARAMOS PRODUCTS CLIENTE DE TIPO CLIENTE PROXY
    @Inject(PRODUCT_SERVICE) private readonly productsClient: ClientProxy,
  ) {}

  @Post()
  createProduct() {
    return 'Create product';
  }

  @Get()
  findAllProducts(@Query() paginationDto: PaginationDto) {
    console.log('paginationDtoOOO', paginationDto);
    // TODO: COMUNCACION CON ENDPOINT DE MICROSERVICIO
    // colocamos el mismo nombre que pusimos al messagepattern en el microservicio

    // EL SEGUNDO ARGUMENTO ES EL PAYLOAD
    return this.productsClient.send(
      { cmd: 'find_all_products' },
      paginationDto,
    );
  }
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.productsClient.send({ cmd: 'find_one_product' }, { id }).pipe(
      catchError((err) => {
        throw new RpcException(err);
      }),
    );

    // try {

    //   const product = await firstValueFrom(
    //     this.productsClient.send({ cmd: 'find_one_product' },{ id })
    //   );
    //   return product;

    // } catch (error) {
    //   throw new RpcException(error);
    // }
  }

  @Delete(':id')
  deleteProduct(@Param('id') id: number) {
    return `delete product by id: ${id}`;
  }
  @Patch(':id')
  updateProduct(@Body() body: any, @Param('id') id: number) {
    return `update product by id: ${id}`;
  }
}
