import { MailerService } from "@nestjs-modules/mailer";
import { OnQueueActive, OnQueueCompleted, OnQueueProgress, Process, Processor } from "@nestjs/bull";
import { Job } from "bull";
import { CreateContaDTO } from "src/database/conta/dto/createConta.dto";

@Processor('email-sender')
export class EmailSenderConsumer{
    constructor(private mailerService: MailerService){}

    @Process('sendMail-job')
    async send(job: Job<CreateContaDTO>){
        const { data} = job
        await this.mailerService.sendMail({
            to: data.email,
            subject: "Boas-vindas", 
            text: `Olá, Usuário ${data.nome}
            
            Sua conta foi criada com sucesso.
            `
        });
    }

    @OnQueueActive()
    async onActive(job: Job){
        console.log(`${job.name} ativado!`);
    }

    @OnQueueProgress()
    async onProgress(job: Job){
        console.log(`${job.name} em Progresso!`);
    }

    @OnQueueCompleted()
    async onComplete(job: Job){
        console.log(`${job.name} Completado!`);
    }
}