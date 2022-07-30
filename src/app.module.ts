import { MailerModule } from '@nestjs-modules/mailer';
import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { ThrottlerModule } from '@nestjs/throttler';

import { AuthModule } from './auth/auth.module';
import { DatabaseModule } from './database/database.module';
import { EmailSenderModule } from './email-sender/email-sender.module';

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS
        }
      }
    }),
    BullModule.forRoot({
      redis: {
        host: 'localhost',
        port: 6379
      },
    }),
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 10
    }),
    AuthModule, 
    DatabaseModule, 
    EmailSenderModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
