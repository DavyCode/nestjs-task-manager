import { SwaggerCustomOptions, SwaggerDocumentOptions } from '@nestjs/swagger';

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
