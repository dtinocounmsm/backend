import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { GlobalLoggerService } from '@shared/application/services/global-logger.service';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useLogger(app.get(GlobalLoggerService));

  app.enableCors({
    origin: '*',
  });

  app.enableVersioning({
    type: VersioningType.URI,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      transform: false,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('Medic Tec API')
    .setDescription('A reference for Medic Tec API')
    .setVersion('1.0')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  await app.listen(3000);
}
bootstrap();
