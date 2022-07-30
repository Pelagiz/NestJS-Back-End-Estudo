import { Injectable } from "@nestjs/common";
import { DadosOrdem, Prisma } from "@prisma/client";
import { PrismaService } from "src/database/prisma.service";
import { CreatePedidoDTO } from "../dto/pedido/createPedido.dto";
import { CreateProdutoDTO } from "../produto/dto/createProduto.dto";


@Injectable()
export class DadosOrdemService{
    constructor(private prisma: PrismaService){}

    async find(
        dadosOrdemWhereUniqueInput: Prisma.DadosOrdemWhereUniqueInput
    ): Promise<DadosOrdem>{
        return this.prisma.dadosOrdem.findUnique({
            where: dadosOrdemWhereUniqueInput,
            include: {
                pedido: true
            }
        });
    }

    async findAll(params: {
        skip?: number;
        take?: number;
        cursor?: Prisma.DadosOrdemWhereUniqueInput
        where?: Prisma.DadosOrdemWhereInput,
        orderBy?: Prisma.DadosOrdemOrderByWithRelationInput,
        include?: Prisma.DadosOrdemInclude
    }): Promise<DadosOrdem[]>{
        const { skip, take, cursor, where, orderBy, include } = params;

        return this.prisma.dadosOrdem.findMany({
            skip,
            take,
            cursor,
            where,
            orderBy,
            include
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

    async transactionCreate(data: Prisma.PedidoCreateInput[]): Promise<any[]>{
        return this.prisma.$transaction(data.map((value) => {
            return this.prisma.pedido.create({
                data: value
            })
        }));
    }

    async transactionUpdate(data: any[]): Promise<any[]>{
        return this.prisma.$transaction(data.map((value) => {
            return this.prisma.pedido.update({
                data: {
                    produto: value.produtoId
                },
                where: {
                    id: value.id
                }
            })
        }));
    }
}