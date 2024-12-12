import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.setGlobalPrefix('api');
  await app.listen(process.env.PHISHING_MANAGEMENT_PORT);
}

bootstrap().then(() => {
  console.log(
    `Server is running on port: ${process.env.PHISHING_MANAGEMENT_PORT}`,
  );
});
