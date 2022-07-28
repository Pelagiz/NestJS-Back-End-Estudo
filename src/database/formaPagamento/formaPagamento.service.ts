import { Injectable } from "@nestjs/common";
import { FormaPagamento, Prisma } from "@prisma/client";
import { PrismaService } from "src/database/prisma.service";


@Injectable()
export class formaPagamentoService{
    constructor(private prisma: PrismaService){}

    async find(
        formaPagamentoWhereUniqueInput: Prisma.FormaPagamentoWhereUniqueInput
    ): Promise<FormaPagamento>{
        return this.prisma.formaPagamento.findUnique({
            where: formaPagamentoWhereUniqueInput
        });
    }

    async findAll(params: {
        skip?: number,
        take?: number,
        cursor?: Prisma.FormaPagamentoWhereUniqueInput,
        where?: Prisma.FormaPagamentoWhereInput,
        orderBy?: Prisma.FormaPagamentoOrderByWithRelationInput
    }): Promise<FormaPagamento[]>{
        const { skip, cursor, orderBy, take, where} = params;

        return this.prisma.formaPagamento.findMany({
            skip,
            take,
            cursor,
            where,
            orderBy
        });
    }

    async create(
        data: Prisma.FormaPagamentoCreateInput
    ): Promise<FormaPagamento>{
        return this.prisma.formaPagamento.create({
            data,
        });
    }

    async update(params: {
        where: Prisma.FormaPagamentoWhereUniqueInput,
        data: Prisma.FormaPagamentoUpdateInput
    }): Promise<FormaPagamento>{
        const { where, data } = params;
        return this.prisma.formaPagamento.update({
            where,
            data
        })
    }

    async delete(
        where: Prisma.FormaPagamentoWhereUniqueInput
    ): Promise<FormaPagamento>{
        return this.prisma.formaPagamento.delete({
            where
        });
    } 
}