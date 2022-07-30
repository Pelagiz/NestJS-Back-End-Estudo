import { InjectQueue } from "@nestjs/bull";
import { Injectable } from "@nestjs/common";
import { Queue } from "bull";
import { CreateContaDTO } from "src/database/conta/dto/createConta.dto";

@Injectable()
export class EmailSenderService{
    constructor(@InjectQueue('email-sender') private emailQueue: Queue){}

    async sendEmail(createContaDTO: CreateContaDTO){
        await this.emailQueue.add("sendMail-job", createContaDTO);
    }
}