import { Body, Controller, Delete, Get, HttpStatus, NotAcceptableException, Param, ParseIntPipe, Post, Put, Query, Request, Response, UseGuards, UseInterceptors } from "@nestjs/common";
import { ContaService } from "./conta.service";
import { Conta as ContaModel, Prisma } from "@prisma/client";
import { CreateContaDTO } from "./dto/createConta.dto";
import { UpdateContaDto } from "./dto/updateConta.dto";
import { ApiBearerAuth, ApiBody, ApiCreatedResponse, ApiInternalServerErrorResponse, ApiNotAcceptableResponse, ApiOkResponse, ApiProperty, ApiQuery, ApiTags, ApiUnauthorizedResponse } from "@nestjs/swagger";
import { ExcludePasswordInterceptor } from "src/genericInterceptors/excludePassword.interceptor";
import { RolesEnum } from "../roles/dto/createRoles.dto";
import { LocalAuthDTO } from "src/auth/dto/localAuth.dto";
import { AuthService } from "src/auth/auth.service";
import { LocalAuthGuard } from "src/auth/local-auth.guard";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { Roles } from "../roles/decorators/roles.decorator";
import { Role } from "../roles/enums/role.enum";


@ApiTags('Conta')
@Controller()
export class ContaController{
    constructor(
        private readonly contaService: ContaService,
        private authService: AuthService
    ){}

   
    // ***************** GET CONTA METHODS ***************************

    @UseInterceptors(ExcludePasswordInterceptor)
    @UseGuards(JwtAuthGuard)
    @Roles(Role.Administrador)
    @Get('conta')
    // ************** SWAGGER ************************
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
    // *************** METHOD ***************************
    async getContas(): Promise<ContaModel[]>{
        return this.contaService.findAll({});
    }



    @UseInterceptors(ExcludePasswordInterceptor)
    @UseGuards(JwtAuthGuard)
    @Roles(Role.Administrador)
    @Get('conta/filterByRole?')
    // ************** SWAGGER ************************
    @ApiBearerAuth()
    @ApiQuery({name: "role", enum: RolesEnum})
    @ApiOkResponse({
        description: "Ação realizada com sucesso!",
    })
    @ApiInternalServerErrorResponse({
        description: "Servidor decidiu morrer por alguma falha misteriosa do destino!",
    })
    // *************** METHOD ***************************
    getAllContasByRoleName(
        @Query('role')
        role: string
    ): Promise<ContaModel[]>{
        return this.contaService.findAll({
            where: {
                Role: {
                    role
                }
            }
        });
    }



    @UseInterceptors(ExcludePasswordInterceptor)
    @UseGuards(JwtAuthGuard)
    @Roles(Role.Administrador)
    @Get('conta/:id')
    // ************** SWAGGER ************************
    @ApiBearerAuth()
    @ApiOkResponse({
        description: "Ação realizada com sucesso!",
    })
    @ApiInternalServerErrorResponse({
        description: "Servidor decidiu morrer por alguma falha misteriosa do destino!",
    })
    // *************** METHOD ***************************
    async getContaById(
        @Param('id', 
            new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE})
        ) 
        id: number
    ): Promise<ContaModel>{
        return await this.contaService.find({
            id: id
        });
    }


    
    @UseInterceptors(ExcludePasswordInterceptor)
    @Get('conta/filter?')
    // ************** SWAGGER ************************
    @ApiOkResponse({
        description: "Ação realizada com sucesso!",
    })
    @ApiInternalServerErrorResponse({
        description: "Servidor decidiu morrer por alguma falha misteriosa do destino!",
    })
    // *************** METHOD ***************************
    async getContaByEmail(@Query('email') email: string): Promise<ContaModel>{
        return this.contaService.find({
            email: email
        });
    }


    @Get('conta/dadosOrdens/:id')
    @UseGuards(JwtAuthGuard)
    @Roles(Role.Usuario)
    // ************** SWAGGER ************************
    @ApiBearerAuth()
    @ApiOkResponse({
        description: "Ação realizada com sucesso!",
    })
    @ApiInternalServerErrorResponse({
        description: "Servidor decidiu morrer por alguma falha misteriosa do destino!",
    })
    // *************** METHOD ***************************
    async getDadosOrdensByConta(@Param(
            'id',
            new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE})
            )
            id: number
        ){
        return this.contaService.findAll({
            where: {
                endereco: {
                    every: {
                        contaId: id,
                        dadosOrdem: {}
                    }
                }
            },
            include: {
                endereco: {
                    include: {
                        dadosOrdem: true
                    }
                }
            }
        })
    }

    // **************** POST METHODS *************************
    
    @Post('conta')
    // ************** SWAGGER ************************
    @ApiBody({type: CreateContaDTO})
    @ApiCreatedResponse({
        description: "A conta foi criada com sucesso!",
    })
    @ApiNotAcceptableResponse({
        description: "Ação não aceitavel por falta de informação!"
    })
    @ApiInternalServerErrorResponse({
        description: "Servidor decidiu morrer por alguma falha misteriosa do destino!",
    })
    // *************** METHOD ***************************
    async createConta(@Request() req,@Body() contaData: CreateContaDTO): Promise<ContaModel | 
        Prisma.PrismaClientUnknownRequestError>{
        if(!req.user){
            const {nome,email,senha,celular, is_verified ,enderecos, roles} = contaData;
            try{
                return this.contaService.create({
                    nome,
                    email,
                    senha,
                    celular,
                    is_verified,
                    endereco: {
                        createMany: {
                            data: enderecos
                        }
                    },
                    Role: {
                        connect: roles
                    }
                });
            }catch(e){
                return e;
            }
        }else{
            throw new NotAcceptableException("Ação não é possível de ser efetuada pois usuário está logado");
        }
    }

    // ****************AUTHENTICATE ************************

    @UseGuards(LocalAuthGuard)
    @Post('conta/auth/login')
    // **************SWAGGER************************
    @ApiBody({type: LocalAuthDTO})
    @ApiUnauthorizedResponse({
        description: "Usuário não possui cargo para realizar tal ação!",
    })
    @ApiInternalServerErrorResponse({
        description: "Servidor decidiu morrer por alguma falha misteriosa do destino!",
    })
    // ***************METHOD***************************
    async login(@Request() req){
        return this.authService.login(req.user);
    }


    // ****************UPDATE**********************

    @UseGuards(JwtAuthGuard)
    @Put('conta/:id')
    // **************SWAGGER************************
    @ApiBearerAuth()
    @ApiBody({type: [UpdateContaDto]})
    @ApiOkResponse({
        description: "Ação realizada com sucesso!",
    })
    @ApiNotAcceptableResponse({
        description: "Ação não aceitavel por falta de informação!"
    })
    @ApiUnauthorizedResponse({
        description: "Usuário não possui cargo para realizar tal ação!",
    })
    @ApiInternalServerErrorResponse({
        description: "Servidor decidiu morrer por alguma falha misteriosa do destino!",
    })
    // ***************METHOD***************************
    async updateConta(@Param('id',
    new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE})
    ) 
    id: number,
    @Body() contaData: UpdateContaDto): Promise<ContaModel>{
        const { nome, email, senha, celular, enderecos } = contaData;

        return this.contaService.update({
            where: { id },
            data: {
                nome,
                email,
                senha,
                celular,
                endereco: {
                    updateMany: enderecos
                }
            }
        })
    }


    // ***************** DELETE ***********************
    @UseGuards(JwtAuthGuard)
    @UseInterceptors(ExcludePasswordInterceptor)
    @Delete('conta/:id')
    // **************SWAGGER************************
    @ApiBearerAuth()
    @ApiOkResponse({
        description: "Ação realizada com sucesso!",
    })
    @ApiInternalServerErrorResponse({
        description: "Servidor decidiu morrer por alguma falha misteriosa do destino!",
    })
    // ***************METHOD***************************
    async deleteConta(@Param('id',
    new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE})
    ) 
    id: number): Promise<ContaModel>{
        return this.contaService.delete({id: id});
    }
}