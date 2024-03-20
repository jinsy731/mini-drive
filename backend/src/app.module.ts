import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './common/auth/auth.module';
import authConfig from './config/authConfig';
import dbConfig from './config/dbConfig';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    UserModule,
    AuthModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `./.${process.env.NODE_ENV}.env`,
      load: [dbConfig, authConfig]
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule{}
