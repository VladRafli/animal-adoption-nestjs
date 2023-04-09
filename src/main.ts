import { ValidationPipe, VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { bodyParser, compression, cookieParser } from '@/_helper';
import { AppModule } from '@/app.module';
import cookieParserConstants from '@/_constants/cookieParser.constants';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'log', 'verbose', 'debug'],
  });

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

  app.use(
    bodyParser.json({
      limit: '50mb',
    }),
  );

  app.use(compression());

  app.use(cookieParser(cookieParserConstants.CookieSecret));

  app.useGlobalPipes(new ValidationPipe());

  await app.listen(5000);
}
bootstrap();
