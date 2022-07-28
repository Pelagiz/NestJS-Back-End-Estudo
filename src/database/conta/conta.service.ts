import { Injectable, InternalServerErrorException, NotAcceptableException } from "@nestjs/common";
import { Conta, Prisma } from "@prisma/client";
import { PrismaService } from "src/database/prisma.service";


@Injectable()
export class ContaService{
    constructor(private prisma: PrismaService){}

    async find(
        contaWhereUniqueInput: Prisma.ContaWhereUniqueInput
    ): Promise<Conta | null>{
        return await this.prisma.conta.findUnique({
            where: contaWhereUniqueInput
        })
    }

    async findAll(
        params: {
            skip?: number;
            take?: number;
            cursor?: Prisma.ContaWhereUniqueInput;
            where?: Prisma.ContaWhereInput;
            orderBy?: Prisma.ContaOrderByWithRelationInput,
            include?: Prisma.ContaInclude
        }
    ): Promise<Conta[]>{
        const { skip, cursor, orderBy, take, where, include} = params;
        return await this.prisma.conta.findMany({
            skip,
            take,
            cursor,
            where,
            orderBy,
            include
        })
    }

    async create(data: Prisma.ContaCreateInput): Promise<Conta | Prisma.PrismaClientKnownRequestError>{
        try{
            return await this.prisma.conta.create({
                data,
            });
        }catch(err){
            if(err instanceof Prisma.PrismaClientKnownRequestError){
                if(err.code === "P2002"){
                    throw new NotAcceptableException({
                        statusCode: 406,
                        message: "Usuário já existe!"
                    });
                }
            }
        }
    }

    async update(params: {
        where: Prisma.ContaWhereUniqueInput;
        data: Prisma.ContaUpdateInput;
    }): Promise<Conta>{
        const {where, data} = params;

        return this.prisma.conta.update({
            data,
            where
        })
    }

    async delete(where: Prisma.ContaWhereUniqueInput): Promise<Conta>{
        return this.prisma.conta.delete({
            where
        })
    }
}