import { AppModule } from '@/app.module';
import {
  appRootPath,
  bodyParser,
  compression,
  dayjs,
  morgan,
  rfs,
} from '@/_helper';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    // httpsOptions: {
    //   key: fs.readFileSync('./certs/minica-key.pem'),
    //   cert: fs.readFileSync('./certs/minica.pem'),
    // },
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
    morgan('combined', {
      stream: rfs.createStream(
        () => {
          return `${dayjs().format('DD-MM-YYYY')}-access.log`;
        },
        {
          interval: '1d',
          path: `${appRootPath.path}/logs/access`,
        },
      ),
    }),
  );

  app.useGlobalPipes(new ValidationPipe());

  await app.listen(5000);
}
bootstrap();
