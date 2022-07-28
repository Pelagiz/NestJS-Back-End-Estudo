import { Module } from "@nestjs/common";
import { AuthModule } from "src/auth/auth.module";
import { PrismaService } from "src/database/prisma.service";
import { ContaController } from "./conta/conta.controller";
import { ContaService } from "./conta/conta.service";
import { DadosOrdemController } from "./dadosOrdem/dadosOrdem.controller";
import { DadosOrdemService } from "./dadosOrdem/dadosOrdem.service";
import { FormaPagamentoController } from "./formaPagamento/formaPagamento.controller";
import { formaPagamentoService } from "./formaPagamento/formaPagamento.service";
import { ProdutoController } from "./produto/produto.controller";
import { ProdutoService } from "./produto/produto.service";
import { RolesController } from "./roles/roles.controller";
import { RolesService } from "./roles/roles.service";


@Module({
    imports: [AuthModule],
    controllers: [ContaController,DadosOrdemController,ProdutoController, RolesController, FormaPagamentoController],
    providers: [PrismaService,ContaService, DadosOrdemService, ProdutoService, RolesService, formaPagamentoService]
})
export class DatabaseModule{}