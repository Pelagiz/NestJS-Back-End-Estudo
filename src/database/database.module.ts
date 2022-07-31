import { Module } from "@nestjs/common";
import { APP_GUARD } from "@nestjs/core";
import { JwtService } from "@nestjs/jwt";
import { AuthModule } from "src/auth/auth.module";
import { PrismaService } from "src/database/prisma.service";
import { EmailSenderModule } from "src/email-sender/email-sender.module";
import { ContaController } from "./conta/conta.controller";
import { ContaService } from "./conta/conta.service";
import { DadosOrdemController } from "./dadosOrdem/dadosOrdem.controller";
import { DadosOrdemService } from "./dadosOrdem/dadosOrdem.service";
import { FormaPagamentoController } from "./formaPagamento/formaPagamento.controller";
import { formaPagamentoService } from "./formaPagamento/formaPagamento.service";
import { ProdutoController } from "./produto/produto.controller";
import { ProdutoService } from "./produto/produto.service";
import { RolesController } from "./roles/roles.controller";
import { RolesGuard } from "./roles/roles.guard";
import { RolesService } from "./roles/roles.service";


@Module({
    imports: [AuthModule, EmailSenderModule],
    controllers: [ContaController,DadosOrdemController,ProdutoController, RolesController, FormaPagamentoController],
    providers: [
        {
            provide: APP_GUARD,
            useClass: RolesGuard
        },
        JwtService,
        PrismaService,ContaService, DadosOrdemService, ProdutoService, RolesService, formaPagamentoService]
})
export class DatabaseModule{}