import { Body, Controller, Delete, Get, HttpStatus, Param, ParseIntPipe, Post, Put, UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common";
import { ProdutoService } from "./produto.service";
import { Produto as ProdutoModel } from "@prisma/client";
import { CreateProdutoDTO, FileUploadDto } from "./dto/createProduto.dto";
import { UpdateProdutoDTO } from "./dto/updateProduto.dto";
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiCreatedResponse, ApiInternalServerErrorResponse, ApiOkResponse, ApiProperty, ApiTags, ApiUnauthorizedResponse, getSchemaPath, IntersectionType } from "@nestjs/swagger";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { Roles } from "../roles/decorators/roles.decorator";
import { Role } from "../roles/enums/role.enum";
import { FileInterceptor } from "@nestjs/platform-express";
import { ExcludeImagemInterceptor } from "src/genericInterceptors/excludeImagem.interceptor";


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
    @UseInterceptors(ExcludeImagemInterceptor)
    @UseInterceptors(FileInterceptor('imagem'))
    @ApiConsumes('multipart/form-data')
    @ApiBearerAuth()
    @ApiCreatedResponse({
        description: "O produto foi criado com sucesso!",
    })
    @ApiUnauthorizedResponse({
        description: "Usuário não possui cargo para realizar tal ação!",
    })
    @ApiBody({
        description: "Cria um produto",
        type: IntersectionType(CreateProdutoDTO, FileUploadDto)
    })
    async createProduto(@Body() produtoData: CreateProdutoDTO, @UploadedFile() file: Express.Multer.File){
        const { nome, quantidade, precoUnitario } = produtoData;


        return this.produtoService.create({
            nome,
            quantidade,
            preco_unitario: precoUnitario,
            imagem: file.buffer
        })

    }
    
    @UseGuards(JwtAuthGuard)
    @Roles(Role.Administrador)
    @Put('produto/:id')
    @ApiBearerAuth()
    @UseInterceptors(ExcludeImagemInterceptor)
    @UseInterceptors(FileInterceptor('imagem'))
    @ApiConsumes('multipart/form-data')
    @ApiBody({
        type: IntersectionType(UpdateProdutoDTO, FileUploadDto)
    })
    
    @ApiUnauthorizedResponse({
        description: "Usuário não possui cargo para realizar tal ação!",
    })
    async updateProduto(
        @Body() produtoData: UpdateProdutoDTO, @UploadedFile() file: Express.Multer.File ,
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
                preco_unitario: precoUnitario,
                imagem: file.buffer
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