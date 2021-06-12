import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { options, customOptions } from './swagger/config-option.swagger';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    logger: console,
  });

  const config = new DocumentBuilder()
    .setTitle('NestJS Tasks Manager Api')
    .setDescription('Tasks Manager API description')
    .setVersion('1.0')
    .addTag('Tasks Manager')
    .build();
  const document = SwaggerModule.createDocument(app, config, options);
  SwaggerModule.setup('api', app, document, customOptions);

  await app.listen(3000);
}
bootstrap();
