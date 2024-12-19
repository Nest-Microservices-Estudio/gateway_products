// YA OCUPAREMOS ESTA CONFIGURACION AL USAR NATS

// import 'dotenv/config';
// import * as joi from 'joi';
// interface EnvVars {
//   PORT: number;
//   // TODO: VARIABLES DE ENTORNO PARA COMUNICACION CON MICROSERVICIO
//   //   CREAMOS DOS VARIABLES DE ENTORNO PARA LA COMUNICACION CON EL
//   //   MICROSERVICIO DE PRODUCTOS
//   PRODUCTS_MICROSERVICE_HOST: string;
//   PRODUCTS_MICROSERVICE_PORT: number;
//   ORDERS_MICROSERVICE_HOST: string;
//   ORDERS_MICROSERVICE_PORT: number;
// }
// const envsSchema: joi.ObjectSchema = joi
//   .object({
//     PORT: joi.number().required(),
//     PRODUCTS_MICROSERVICE_HOST: joi.string().required(),
//     PRODUCTS_MICROSERVICE_PORT: joi.number().required(),
//     ORDERS_MICROSERVICE_HOST: joi.string().required(),
//     ORDERS_MICROSERVICE_PORT: joi.number().required(),
//   })
//   .unknown(true);
// const { error, value } = envsSchema.validate(process.env);
// if (error) {
//   throw new Error(`Config validation error: ${error.message}`);
// }
// const envVars: EnvVars = value;
// export const envs = {
//   port: envVars.PORT,
//   productsMicroserviceOptions: {
//     host: envVars.PRODUCTS_MICROSERVICE_HOST,
//     port: envVars.PRODUCTS_MICROSERVICE_PORT,
//   },
//   ordersMicroserviceOptions: {
//     host: envVars.ORDERS_MICROSERVICE_HOST,
//     port: envVars.ORDERS_MICROSERVICE_PORT,
//   },
// };


import 'dotenv/config';
import * as joi from 'joi';
interface EnvVars {
  PORT: number;


  // TODO: NATS ENVS
  NATS_SERVERS: string[]
}
const envsSchema: joi.ObjectSchema = joi.object({

  // ASI DEVINIMOS UNA ENV QUE SERA ARRAY
  NATS_SERVERS: joi.array().items(joi.string()).required(),
}).unknown(true);

// TODO: NATS MODIFICAMOS VARIABLES PARA PODER TOMAR LOS ELEMENTOS DE LA VARAIBLE DE ENTORNO
const { error, value } = envsSchema.validate({
  ...process.env,
  NATS_SERVERS: process.env.NATS_SERVERS?.split(','),
});
if(error) {
    throw new Error(`Config validation error: ${error.message}`);
}
const envVars: EnvVars = value;
export const envs = {
    port: envVars.PORT,
    natsServers: envVars.NATS_SERVERS
}
