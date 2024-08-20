import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS if needed
  app.enableCors({
    origin: 'http://localhost:3000', // Adjust according to your frontend's URL
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

  await app.listen(3001); // Port for the NestJS application
}
bootstrap();
