import { Body, Controller, Delete, Get, HttpStatus, Param, ParseIntPipe, Post, Put, Query, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiCreatedResponse, ApiInternalServerErrorResponse, ApiOkResponse, ApiTags, ApiUnauthorizedResponse } from "@nestjs/swagger";
import { formaPagamentoService } from "./formaPagamento.service";
import { FormaPagamento as FormaPagamentoModel } from "@prisma/client";
import { CreateFormaPagamentoDTO } from "./dto/createFormaPagamento.dto";
import { UpdateFormaPagamentoDTO } from "./dto/updateFormaPagamento.dto";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { Roles } from "../roles/decorators/roles.decorator";
import { Role } from "../roles/enums/role.enum";

@ApiTags("Forma de Pagamento")
@Controller()
export class FormaPagamentoController{
    constructor(private readonly formaPagamentoService: formaPagamentoService){}

    @Get('formaPagamento')
    @ApiOkResponse({
        description: "Ação realizada com sucesso!",
    })
    @ApiUnauthorizedResponse({
        description: "Usuário não possui cargo para realizar tal ação!",
    })
    @ApiInternalServerErrorResponse({
        description: "Servidor decidiu morrer por alguma falha misteriosa do destino!",
    })
    async getFormaPagamentos(): Promise<FormaPagamentoModel[]>{
        return this.formaPagamentoService.findAll({});
    }

    @Get('formaPagamento/:id')
    @ApiOkResponse({
        description: "Ação realizada com sucesso!",
    })
    @ApiUnauthorizedResponse({
        description: "Usuário não possui cargo para realizar tal ação!",
    })
    @ApiInternalServerErrorResponse({
        description: "Servidor decidiu morrer por alguma falha misteriosa do destino!",
    })
    async getFormaPagamentoById(@Param(
        'id',
        new ParseIntPipe({errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE})
    ) 
    id: number): Promise<FormaPagamentoModel>{
        return this.formaPagamentoService.find({
            id
        });
    }

    @Get('formaPagamento/filter?')
    @ApiOkResponse({
        description: "Ação realizada com sucesso!",
    })
    @ApiUnauthorizedResponse({
        description: "Usuário não possui cargo para realizar tal ação!",
    })
    @ApiInternalServerErrorResponse({
        description: "Servidor decidiu morrer por alguma falha misteriosa do destino!",
    })
    async getFormaPagamentoByName(
        @Query('formaPagamento') formaPagamento: string
    ): Promise<FormaPagamentoModel>{
        return this.formaPagamentoService.find({
            formaPagamento
        });
    }

    @UseGuards(JwtAuthGuard)
    @Roles(Role.Administrador)
    @Post('formaPagamento')
    @ApiBearerAuth()
    @ApiCreatedResponse({
        description: "Foi criado com sucesso a nova forma de pagamento!",
    })
    @ApiInternalServerErrorResponse({
        description: "Servidor decidiu morrer por alguma falha misteriosa do destino!",
    })
    async createFormaPagamento(
        @Body() formaPagamentoData: CreateFormaPagamentoDTO
    ): Promise<FormaPagamentoModel>{
        const {formaPagamento} = formaPagamentoData;
        return this.formaPagamentoService.create({
            formaPagamento
        });
    }

    @Put("formaPagamento/:id")
    @Roles(Role.Administrador)
    @ApiBearerAuth()
    @ApiOkResponse({
        description: "Ação realizada com sucesso!",
    })
    @ApiInternalServerErrorResponse({
        description: "Servidor decidiu morrer por alguma falha misteriosa do destino!",
    })
    async updateFormaPagamento(
        @Param(
            'id',
            new ParseIntPipe({errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE})
            ) 
        id: number,
        @Body() formaPagamentoData: UpdateFormaPagamentoDTO
    ): Promise<FormaPagamentoModel>{
        const { formaPagamento } = formaPagamentoData;
        
        return this.formaPagamentoService.update({
            where: {id},
            data: {
                formaPagamento
            }
        })
    }

    @Delete("formaPagamento/:id")
    @Roles(Role.Administrador)
    @ApiBearerAuth()
    @ApiOkResponse({
        description: "Ação realizada com sucesso!",
    })
    @ApiInternalServerErrorResponse({
        description: "Servidor decidiu morrer por alguma falha misteriosa do destino!",
    })
    async deleteFormaPagamento(
        @Param(
            'id',
            new ParseIntPipe({errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE})
            ) 
        id: number
    ){
        return this.formaPagamentoService.delete({
            id
        });
    }
}