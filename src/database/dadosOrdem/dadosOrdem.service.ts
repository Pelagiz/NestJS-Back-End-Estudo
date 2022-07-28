import { Injectable } from "@nestjs/common";
import { DadosOrdem, Prisma } from "@prisma/client";
import { PrismaService } from "src/database/prisma.service";


@Injectable()
export class DadosOrdemService{
    constructor(private prisma: PrismaService){}

    async find(
        dadosOrdemWhereUniqueInput: Prisma.DadosOrdemWhereUniqueInput
    ): Promise<DadosOrdem>{
        return this.prisma.dadosOrdem.findUnique({
            where: dadosOrdemWhereUniqueInput
        });
    }

    async findAll(params: {
        skip?: number;
        take?: number;
        cursor?: Prisma.DadosOrdemWhereUniqueInput
        where?: Prisma.DadosOrdemWhereInput,
        orderBy?: Prisma.DadosOrdemOrderByWithRelationInput
    }): Promise<DadosOrdem[]>{
        const { skip, take, cursor, where, orderBy } = params;

        return this.prisma.dadosOrdem.findMany({
            skip,
            take,
            cursor,
            where,
            orderBy
        });
    }

    async create(data: Prisma.DadosOrdemCreateInput):Promise<DadosOrdem>{
        
        return this.prisma.dadosOrdem.create({
            data,
        });
    }

    async update(params: {
        where: Prisma.DadosOrdemWhereUniqueInput,
        data: Prisma.DadosOrdemUpdateInput 
    }): Promise<DadosOrdem>{
        const { where, data } = params;

        return this.prisma.dadosOrdem.update({
            where,
            data
        });
    }

    async delete(where: Prisma.DadosOrdemWhereUniqueInput): Promise<DadosOrdem>{
        return this.prisma.dadosOrdem.delete({
            where
        });
    }
}