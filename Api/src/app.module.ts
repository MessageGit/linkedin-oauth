import { Module } from '@nestjs/common';

/* NestJS Config */
import { ConfigModule } from '@nestjs/config';
import { config } from './config/config';

/* Imported modules */
import { LinkedInModule } from './microservices/linkedin/linkedin.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config]
    }),
    LinkedInModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
