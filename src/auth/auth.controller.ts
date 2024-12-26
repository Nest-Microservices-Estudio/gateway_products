import {
  Controller,
  Post,
  Body,
  Inject,
  Get,
  UseGuards,
} from '@nestjs/common';

import { NATS_SERVICE } from 'src/config';
import { ClientProxy } from '@nestjs/microservices';
import { RegisterUserDto } from './dto/register-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { AuthGuard } from './guards/auth.guard';
import { User } from './decorators/user.decorators';
import { CurrentUser } from './interfaces/current-user.interface';
import { Token } from './decorators/token.decorators';

@Controller('auth')
export class AuthController {
  constructor(
    // TODO: LLAMAMOS A LA CONSTAMTE QUE ES NUESTRO PRODUCT SERVICE
    // PARA INYECTARLO EN EL CONSTRUCTOR
    // Y DECLARAMOS PRODUCTS CLIENTE DE TIPO CLIENTE PROXY
    // @Inject(ORDER_SERVICE) private readonly ordersClient: ClientProxy,
    @Inject(NATS_SERVICE) private readonly client: ClientProxy,
  ) {}
  @Post('register')
  create(@Body() registerUserDto: RegisterUserDto) {
    return this.client.send('auth.register.user', registerUserDto);
  }

  @Post('login')
  loginUser(@Body() loginUserDto: LoginUserDto) {
    return this.client.send('auth.login.user', loginUserDto);
  }

  // TODO: GUARD QUE PIDE EL TOKEN PARA ACCEDER A LA RUTA
  @UseGuards(AuthGuard)
  @Get('verify')
  // TODO: @Req para obtener los headers y asi obtener el token
  // EL TOKEN LLEGARA A LOS HEADERS Y LOS TOMO DE LA REQUEST

  // TODO: DECORADOR CREADO QUE DEVUELVE AL USUARIO QUE VIENE EN LA REQUEST
  verifyToken(@User() user: CurrentUser, @Token() token: string) {
   
    // EN VEZ DE SACARLO DE LA REQUEST CON @Req() 
    // LO SACO DE LOS DECORADORES QUE CREE
    // @User() user: CurrentUser, @Token() token: string
    // const user = req.user;
    // const token = req['token'];

    // console.log('user', user);
    // console.log('token', token);

    // console.log('req', req.headers);

    return {
      user,
      token
    };
  }
}
