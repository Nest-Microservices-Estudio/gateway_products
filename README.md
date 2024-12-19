## Cliente Gateway 

El gateway es el punto de comunicación entre nuetros clientes y nuestros servicios. Es el encargado de recibir las peticiones, enviarlas a los servicios correspondientes y devolver la respuesta del cliente.

## Dev

1. Clonar repo
2. Instalar dependencias
3. Crear archivo .env basado en el template env.template
4. Levantar el servidor de Nats previa instalaciÓn Docker compose 

```
- Abrir docker compose
- Abrir terminal
- Ejecutar: docker run -d --name nats-server -p 4222:4222 -p 8222:8222 nats
```

4. Tener levantados los microservicios que se van a consumir 
5. Levantar proyecto con npm run start:dev

## Nats

```
docker run -d --name nats-server -p 4222:4222 -p 8222:8222 nats
```