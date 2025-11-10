import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // ✅ Enable CORS here
  app.enableCors({
    origin: [
      'http://localhost:5173', // frontend dev URL
      'https://your-production-site.com', // production URL
    ],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // allow cookies
  });
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
