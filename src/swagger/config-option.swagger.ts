import {
  DocumentBuilder,
  SwaggerCustomOptions,
  SwaggerDocumentOptions,
} from '@nestjs/swagger';

export const options: SwaggerDocumentOptions = {
  /**
   * make sure that the library generates operation names like createUser instead of UserController_createUser
   * @param controllerKey
   * @param methodKey
   * @returns
   */
  operationIdFactory: (controllerKey: string, methodKey: string): string =>
    methodKey,
};

export const customOptions: SwaggerCustomOptions = {
  swaggerOptions: {
    persistAuthorization: true,
  },
};

export const config = new DocumentBuilder()
  .setTitle('NestJS Tasks Manager Api')
  .setDescription('Tasks Manager API description')
  .setVersion('1.0')
  .addTag('Tasks Manager')
  .build();
