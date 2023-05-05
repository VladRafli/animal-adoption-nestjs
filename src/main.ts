import { AppModule } from '@/app.module';
import {
  bodyParser,
  compression,
  dayjs,
  expressSession,
  fs,
  morgan,
  rfs,
} from '@/_helper';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import expressSessionConstants from './_constants/expressSession.constants';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    httpsOptions: {
      key: fs.readFileSync('./certs/minica-key.pem'),
      cert: fs.readFileSync('./certs/minica.pem'),
    },
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

  app.use(
    expressSession({
      resave: false,
      saveUninitialized: false,
      secret: expressSessionConstants.CookieSecret,
      cookie: {
        httpOnly: true,
        secure: true,
        signed: true,
        sameSite: true,
      },
    }),
  );

  app.use(
    morgan('combined', {
      stream: rfs.createStream(
        `./logs/access/${dayjs().format('DD-MM-YYYY')}-access.log`,
        {
          interval: '1d',
          compress: 'gzip',
        },
      ),
    }),
  );

  app.useGlobalPipes(new ValidationPipe());

  await app.listen(5000);
}
bootstrap();
