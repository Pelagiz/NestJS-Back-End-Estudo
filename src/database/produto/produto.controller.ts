import { Body, Controller, Delete, Get, HttpStatus, Param, ParseIntPipe, Post, Put, UseGuards } from "@nestjs/common";
import { ProdutoService } from "./produto.service";
import { Produto as ProdutoModel } from "@prisma/client";
import { CreateProdutoDTO } from "./dto/createProduto.dto";
import { UpdateProdutoDTO } from "./dto/updateProduto.dto";
import { ApiBearerAuth, ApiBody, ApiCreatedResponse, ApiInternalServerErrorResponse, ApiOkResponse, ApiProperty, ApiTags, ApiUnauthorizedResponse } from "@nestjs/swagger";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { Roles } from "../roles/decorators/roles.decorator";
import { Role } from "../roles/enums/role.enum";


@ApiTags("Produto")
@Controller()
export class ProdutoController{
    constructor(private readonly produtoService: ProdutoService){}



    @Get('produto')
    @ApiOkResponse({
        description: "Ação realizada com sucesso!",
    })
    @ApiUnauthorizedResponse({
        description: "Usuário não possui cargo para realizar tal ação!",
    })
    @ApiInternalServerErrorResponse({
        description: "Servidor decidiu morrer por alguma falha misteriosa do destino!",
    })
    async getProdutos(): Promise<ProdutoModel[]>{
        return this.produtoService.findAll({});
    }

    @Get('produto/:id')
    @ApiOkResponse({
        description: "Ação realizada com sucesso!",
    })
    @ApiUnauthorizedResponse({
        description: "Usuário não possui cargo para realizar tal ação!",
    })
    @ApiInternalServerErrorResponse({
        description: "Servidor decidiu morrer por alguma falha misteriosa do destino!",
    })
    async getProdutoById(@Param('id', ParseIntPipe) id: number): Promise<ProdutoModel>{
        return this.produtoService.find({
            id
        });
    }


    @UseGuards(JwtAuthGuard)
    @Roles(Role.Administrador)
    @Post('produto')
    @ApiBearerAuth()
    @ApiCreatedResponse({
        description: "O produto foi criado com sucesso!",
    })
    @ApiUnauthorizedResponse({
        description: "Usuário não possui cargo para realizar tal ação!",
    })
    @ApiBody({type: CreateProdutoDTO})
    async createProduto(@Body() produtoData: CreateProdutoDTO): Promise<ProdutoModel>{
        const { nome, quantidade, precoUnitario, imagem } = produtoData;

        return this.produtoService.create({
            nome,
            quantidade,
            preco_unitario: precoUnitario,
            imagem
        })
    }
    
    @UseGuards(JwtAuthGuard)
    @Roles(Role.Administrador)
    @Put('produto/:id')
    @ApiBearerAuth()
    @ApiUnauthorizedResponse({
        description: "Usuário não possui cargo para realizar tal ação!",
    })
    async updateProduto(
        @Body() produtoData: UpdateProdutoDTO, 
        @Param('id', new ParseIntPipe({errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE}))
        id: number
    ): Promise<ProdutoModel>{
        const { nome, quantidade, precoUnitario } = produtoData;

        return this.produtoService.update({
            where:{
                id
            },
            data: {
                nome,
                quantidade,
                preco_unitario: precoUnitario
            }
        })
    }

    @UseGuards(JwtAuthGuard)
    @Roles(Role.Administrador)
    @Delete('produto/:id')
    @ApiBearerAuth()
    @ApiUnauthorizedResponse({
        description: "Usuário não possui cargo para realizar tal ação!",
    })
    async deleteProduto(
        @Param('id', new ParseIntPipe({errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE}))
        id: number
    ): Promise<ProdutoModel>{
        return this.produtoService.delete({
            id
        })
    }
}