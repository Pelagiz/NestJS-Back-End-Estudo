import { Body, Controller, Delete, Get, HttpStatus, Param, ParseIntPipe, Post, Put, UseGuards } from "@nestjs/common";
import { DadosOrdemService } from "./dadosOrdem.service";
import { DadosOrdem as DadosOrdemModel } from "@prisma/client";
import { CreateDadosOrdemDTO } from "./dto/createDadosOrdem.dto";
import { UpdateDadosOrdemDTO, UpdateParamsDTO } from "./dto/updateDadosOrdem.dto";
import { ApiBearerAuth, ApiBody, ApiCreatedResponse, ApiInternalServerErrorResponse, ApiOkResponse, ApiTags, ApiUnauthorizedResponse } from "@nestjs/swagger";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { Roles } from "../roles/decorators/roles.decorator";
import { Role } from "../roles/enums/role.enum";
import { UpdateEnderecoDTO } from "../dto/endereco/updateEndereco.dto";
import { UpdatePedidoDTO } from "../dto/pedido/updatePedido.dto";
import { CreateEnderecoDTO } from "../dto/endereco/createEndereco.dto";
import { CreatePedidoDTO } from "../dto/pedido/createPedido.dto";


@ApiTags('Dados Da Ordem')
@Controller()
export class DadosOrdemController{
    constructor(private readonly dadosOrdem: DadosOrdemService){};

    @UseGuards(JwtAuthGuard)
    @Roles(Role.Administrador)
    @Get('dadosOrdem')
    @ApiBearerAuth()
    @ApiOkResponse({
        description: "Ação realizada com sucesso!",
    })
    @ApiUnauthorizedResponse({
        description: "Usuário não possui cargo para realizar tal ação!",
    })
    @ApiInternalServerErrorResponse({
        description: "Servidor decidiu morrer por alguma falha misteriosa do destino!",
    })
    async getDadosOrdens():Promise<DadosOrdemModel[]>{
        return this.dadosOrdem.findAll({});
    }

    @UseGuards(JwtAuthGuard)
    @Roles(Role.Administrador)
    @Get('dadosOrdem/:id')
    @ApiBearerAuth()
    @ApiOkResponse({
        description: "Ação realizada com sucesso!",
    })
    @ApiInternalServerErrorResponse({
        description: "Servidor decidiu morrer por alguma falha misteriosa do destino!",
    })
    async getDadosOrdem(
        @Param(
            'id', 
            new ParseIntPipe({errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE}
        ))
        id: number
        ):Promise<DadosOrdemModel>{
        return this.dadosOrdem.find({
            id
        });
    }

    // Incompleto, implementação de $transaction necessária

    @Post('dadosOrdem')
    @ApiBody({type: CreateDadosOrdemDTO})
    @ApiCreatedResponse({
        description: "A conta foi criada com sucesso!",
    })
    @ApiUnauthorizedResponse({
        description: "Usuário não possui cargo para realizar tal ação!",
    })
    @ApiInternalServerErrorResponse({
        description: "Servidor decidiu morrer por alguma falha misteriosa do destino!",
    })
    async createDadosOrdem(@Body() dadosOrdemData: CreateDadosOrdemDTO, 
        enderecoData: CreateEnderecoDTO, pedidoData : CreatePedidoDTO[] ): Promise<DadosOrdemModel>{
        const { nome, email, celular, formaPagamento } = dadosOrdemData;
        const { rua, bairro, cidade, numero } = enderecoData;

        return this.dadosOrdem.create({
            nome: nome,
            email: email,
            celular: celular,
            endereco: {
                connectOrCreate: {
                    create: {
                        rua,
                        bairro,
                        cidade,
                        numero
                    },
                    where: {
                        id: enderecoData.id
                    }
                }
            },
            pedido: {
                createMany:{
                    data: pedidoData
                }
            },
            formaPagamento: {
                connect: formaPagamento
            } 
        })
    }

    // Incompleto, implementação de $transaction necessária

    @UseGuards(JwtAuthGuard)
    @Roles(Role.Usuario)
    @Put('dadosOrdem/:id')
    @ApiBearerAuth()
    @ApiBody({type: UpdateParamsDTO})
    @ApiUnauthorizedResponse({
        description: "Usuário não possui cargo para realizar tal ação!",
    })
    @ApiInternalServerErrorResponse({
        description: "Servidor decidiu morrer por alguma falha misteriosa do destino!",
    })
    async updateDadosOrdem(
        @Param(
            'id',
            new ParseIntPipe({errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE})
        )
        id: number,
        @Body() params: UpdateParamsDTO
    ): Promise<DadosOrdemModel>{
        const { nome, celular, email, formaPagamento, bairro, cidade, rua, numero, pedidos } = params;

        return this.dadosOrdem.update({
            where: {id},
            data: {
                nome,
                celular,
                email,
                endereco: {
                    update: {
                        rua,
                        bairro,
                        cidade,
                        numero,
                    }
                },
                formaPagamento: {
                    update: formaPagamento
                },
                pedido: {
                    updateMany: {
                        data: pedidos,
                        where: {

                        }
                    }
                }
            }
        })
    }

    @UseGuards(JwtAuthGuard)
    @Roles(Role.Usuario)
    @Delete('dadosOrdem/:id')
    @ApiBearerAuth()
    @ApiUnauthorizedResponse({
        description: "Usuário não possui cargo para realizar tal ação!",
    })
    @ApiInternalServerErrorResponse({
        description: "Servidor decidiu morrer por alguma falha misteriosa do destino!",
    })
    async deleteDadosOrdem(
        @Param(
            'id',
            new ParseIntPipe({errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE})
        )
        id: number,
    ): Promise<DadosOrdemModel>{
        return this.dadosOrdem.delete({
            id
        })
    }
}