import { ConsoleLogger, ValidationPipe } from '@nestjs/common';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { AppExceptionFilter } from './config/filter/app-exception.filter';
import { HttpExceptionFilter } from './config/filter/http-exception.filter';
import { validationPipeExceptionFactory } from './exceptions/validation-pipe-exception-factory';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: new ConsoleLogger({
      prefix: 'BentoFees',
      // json: true,
    }),
  });

  const config = new DocumentBuilder()
    .setTitle('Delivery-Fees API microservice')
    .setDescription(
      'This is the API documentation for the Delivery-Fees microservice, which is part of the Bento project.',
    )
    .setContact('Bento', 'https://bento.ky', 'edson.ito@bento.ky')
    .setLicense('MIT', 'https://opensource.org/licenses/MIT')
    .setVersion('1.0')
    .addBearerAuth({
      type: 'http',
      description: 'JWT token obtained from https://bento.ky/ website',
    })
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, documentFactory);

  app.setGlobalPrefix('api');
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      exceptionFactory: validationPipeExceptionFactory,
    }),
  );

  const httpAdapterHost = app.get(HttpAdapterHost);
  app.useGlobalFilters(
    new AppExceptionFilter(httpAdapterHost),
    new HttpExceptionFilter(),
  );

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
