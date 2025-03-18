import { ConsoleLogger, ValidationPipe } from '@nestjs/common';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { validationPipeExceptionFactory } from './exceptions/validation-pipe-exception-factory';
import { AppExceptionFilter } from './filter/exception.filter';
import { HttpExceptionFilter } from './filter/http-exception.filter';

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
    .setContact('Bento', 'https://bento.com', 'edson.ito@bento.com')
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
