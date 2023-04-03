import { ValidationPipe, VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as compression from 'compression';
import * as cookieParser from 'cookie-parser';
import { AppModule } from './app.module';
import cookieParserConstants from './_constants/cookieParser.constants';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Animal Adoption')
    .setDescription(
      'Animal Adoption API endpoint documentation. Used as reference for thesis',
    )
    .setVersion('1')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  app.enableVersioning({
    type: VersioningType.URI,
  });

  app.enableCors();

  app.use(compression());

  app.use(cookieParser(cookieParserConstants.CookieSecret));

  app.useGlobalPipes(new ValidationPipe());

  await app.listen(5000);
}
bootstrap();
