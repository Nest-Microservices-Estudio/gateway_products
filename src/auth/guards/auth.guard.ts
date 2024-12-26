import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

import { Request } from 'express';
import { firstValueFrom } from 'rxjs';
import { NATS_SERVICE } from 'src/config';

@Injectable()
export class AuthGuard implements CanActivate {
  // AQUI LLAMAMOS AL METODO DE VERIFY TOKEN QUE ESTA EN EL AUTH SERVICE DE AUTH MS

  constructor(@Inject(NATS_SERVICE) private readonly client: ClientProxy) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException('Token no encontrado');
    }
    try {
      // EN EL VERIFYTOKEN DE AUTH MS SI EL TOKEN RECIBIDO ES CORRECTO
      // DEVUELVE EL USUARIO Y UN NUEVO TOKEN
      const { user, token: newToken } = await firstValueFrom(
        this.client.send('auth.verify.token', token),
      );

      // ESTE USUARIO ENONTRADO EN EL TOKEN LO PONGO EN EL REQUEST
      request['user'] = user;

      // Y EL TOKEN NUEVO LO PONGO EN EL REQUEST
      // POR LO QUE EL TOKEN Y EL USUAURIO ESTAN DISPONIBLES EN EL REQUEST
      request['token'] = newToken;
    } catch {
      throw new UnauthorizedException();
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
