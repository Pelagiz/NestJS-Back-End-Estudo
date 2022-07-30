import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { EmailSenderService } from './emailSender.service';
import { EmailSenderConsumer } from './emailSenderConsumer.service';

@Module({
    imports: [
        BullModule.registerQueue({
            name: 'email-sender'
        })
    ],
    providers: [EmailSenderService, EmailSenderConsumer],
    exports: [EmailSenderService]
})
export class EmailSenderModule {}
