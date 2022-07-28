import { Injectable } from "@nestjs/common";
import { Prisma, Roles } from "@prisma/client";
import { PrismaService } from "src/database/prisma.service";


@Injectable()
export class RolesService{
    constructor(private prisma: PrismaService){}

    async find(
        rolesWhereUniqueInput: Prisma.RolesWhereUniqueInput
    ): Promise<Roles>{
        return this.prisma.roles.findUnique({
            where: rolesWhereUniqueInput
        });
    }

    async findAll(params: {
        skip?: number;
        take?: number;
        cursor?: Prisma.RolesWhereUniqueInput,
        where?: Prisma.RolesWhereInput,
        orderBy?: Prisma.RolesOrderByWithRelationInput
    }): Promise<Roles[]>{
        const { skip, take, cursor, orderBy, where } = params;

        return this.prisma.roles.findMany({
            skip,
            take,
            cursor,
            where,
            orderBy
        });
    }

    async create(data: Prisma.RolesCreateInput): Promise<Roles>{


        return this.prisma.roles.create({
            data,
        });
    }

    async update(params: {
        where: Prisma.RolesWhereUniqueInput,
        data: Prisma.RolesUpdateInput
    }):Promise<Roles>{
        const { where, data} = params;

        return this.prisma.roles.update({
            where,
            data
        });
    }

    async delete(where: Prisma.RolesWhereUniqueInput): Promise<Roles>{
        return this.prisma.roles.delete({
            where,
        })
    }
}