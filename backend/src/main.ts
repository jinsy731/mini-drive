import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors({
    origin: "http://localhost:3000",
    methods: "GET, HEAD, PUT, PATCH, POST, DELETE",
    credentials: true, // 인증 정보(쿠키, Authorization 헤더 등) 포함 여부
  })

  const config = new DocumentBuilder()
  .setTitle("Mini Drive API")
  .setDescription("Mini Drive API")
  .setVersion("1.0")
  .addBearerAuth(
    {
      // I was also testing it without prefix 'Bearer ' before the JWT
      description: `[just text field] Please enter token in following format: Bearer <JWT>`,
      name: "Authorization",
      bearerFormat: "Bearer", // I`ve tested not to use this field, but the result was the same
      scheme: "Bearer",
      type: "http", // I`ve attempted type: 'apiKey' too
      in: "Header",
    },
    "access-token", 
  )
  .build()

  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup("api", app, document)

  await app.listen(8080);

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();
