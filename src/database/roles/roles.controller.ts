import { Body, Controller, Delete, Get, HttpStatus, Param, ParseIntPipe, Post, Put, Query, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiBody, ApiCreatedResponse, ApiInternalServerErrorResponse, ApiOkResponse, ApiQuery, ApiTags, ApiUnauthorizedResponse } from "@nestjs/swagger";
import { RolesService } from "./roles.service";
import { Roles as RolesModel } from "@prisma/client";
import { CreateRolesDTO, RolesEnum } from "./dto/createRoles.dto";
import { UpdateRolesDTO } from "./dto/updateRoles.dto";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { Roles } from "./decorators/roles.decorator";
import { Role } from "./enums/role.enum";

@ApiTags("Roles")
@Controller()
export class RolesController{
    constructor(private readonly rolesService: RolesService){}
    
    @Get('roles')
    @ApiOkResponse({
        description: "Ação realizada com sucesso!",
    })
    @ApiInternalServerErrorResponse({
        description: "Servidor decidiu morrer por alguma falha misteriosa do destino!",
    })
    async getRoles(): Promise<RolesModel[]>{
        return this.rolesService.findAll({});
    }


    @Get("roles/:id")
    @ApiOkResponse({
        description: "Ação realizada com sucesso!",
    })
    @ApiInternalServerErrorResponse({
        description: "Servidor decidiu morrer por alguma falha misteriosa do destino!",
    })
    async getRoleById(@Param('id', new ParseIntPipe({errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE})) id: number): Promise<RolesModel>{
        return this.rolesService.find({
            id
        });
    }

    @ApiQuery({name: "role", enum: RolesEnum})
    @Get("roles/filter?")
    @ApiOkResponse({
        description: "Ação realizada com sucesso!",
    })
    @ApiInternalServerErrorResponse({
        description: "Servidor decidiu morrer por alguma falha misteriosa do destino!",
    })
    async getRoleByName(@Query('role') role: string): Promise<RolesModel>{
        return this.rolesService.find({
            role
        })
    }

    @UseGuards(JwtAuthGuard)
    @Roles(Role.Administrador)
    @ApiBody({
        type: CreateRolesDTO,
        description: "Cria um cargo"
    })
    @ApiBearerAuth()
    @Post('roles')
    @ApiCreatedResponse({
        description: "A conta foi criada com sucesso!",
    })
    @ApiUnauthorizedResponse({
        description: "Usuário não possui cargo para realizar tal ação!",
    })
    @ApiInternalServerErrorResponse({
        description: "Servidor decidiu morrer por alguma falha misteriosa do destino!",
    })
    async createRole(@Body() roleData: CreateRolesDTO ): Promise<RolesModel>{
        const { role } = roleData;

        return this.rolesService.create({
            role
        });
    }

    @Put('roles/:id')
    @UseGuards(JwtAuthGuard)
    @Roles(Role.Administrador)
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
    async updateRole(
        @Param('id', new ParseIntPipe({errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE})) id: number, 
        @Body() roleData: UpdateRolesDTO): Promise<RolesModel>{
        const { role } = roleData;

        return this.rolesService.update({
            where: {id},
            data: {
                role
            }
        })
    }

    @Delete('roles/:id')
    @UseGuards(JwtAuthGuard)
    @Roles(Role.Administrador)
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
    async deleteRole(
        @Param('id', new ParseIntPipe({errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE})) id: number, 
    ): Promise<RolesModel>{
        return this.rolesService.delete({
            id
        });
    }

}