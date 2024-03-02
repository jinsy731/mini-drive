import { Module, OnModuleInit } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import authConfig from './config/authConfig';
import dbConfig from './config/dbConfig';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    UserModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `./src/config/env/.${process.env.NODE_ENV}.env`,
      load: [dbConfig, authConfig]
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule{}
