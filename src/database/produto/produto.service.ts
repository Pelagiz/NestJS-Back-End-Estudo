import { Injectable } from "@nestjs/common";
import { Prisma, Produto } from "@prisma/client";
import { PrismaService } from "src/database/prisma.service";


@Injectable()
export class ProdutoService{
    constructor(private prisma: PrismaService){}

    async find(
        produtoWhereUniqueInput: Prisma.ProdutoWhereUniqueInput
    ): Promise<Produto>{
        return this.prisma.produto.findUnique({
            where: produtoWhereUniqueInput
        })
    }

    async findAll( params: {
        skip?: number;
        take?: number;
        cursor?: Prisma.ProdutoWhereUniqueInput;
        where?: Prisma.ProdutoWhereInput;
        orderBy?: Prisma.ProdutoOrderByWithRelationInput; 
    }): Promise<Produto[]>{
        const {skip, take, cursor, where, orderBy} = params;
        return this.prisma.produto.findMany({
            skip,
            take,
            cursor,
            where,
            orderBy
        });
    }

    async create( data: Prisma.ProdutoCreateInput): Promise<Produto>{
        return this.prisma.produto.create({
            data,
        });
    }

    async update(params: {
        where: Prisma.ProdutoWhereUniqueInput;
        data: Prisma.ProdutoUpdateInput;
    }): Promise<Produto>{
        const { where, data} = params;

        return this.prisma.produto.update({
            where,
            data
        });
    }

    async delete(where: Prisma.ProdutoWhereUniqueInput): Promise<Produto>
    {
        return this.prisma.produto.delete({
            where,
        })
    }
}