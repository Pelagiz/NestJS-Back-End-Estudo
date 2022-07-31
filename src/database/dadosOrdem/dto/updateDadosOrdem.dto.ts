import { ApiProperty, IntersectionType, PartialType } from "@nestjs/swagger";
import { Prisma } from "@prisma/client";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";
import { UpdateEnderecoDTO } from "src/database/dto/endereco/updateEndereco.dto";
import { UpdatePedidoDTO } from "src/database/dto/pedido/updatePedido.dto";
import { CreateDadosOrdemDTO } from "./createDadosOrdem.dto";


export class UpdateDadosOrdemDTO{
    @ApiProperty({
        title: "Nome",
        description: "O nome usado pelo cliente",
        example: "Lednew",
        type: String
    })
    @IsString()
    @IsNotEmpty()
    nome?: string;

    @ApiProperty({
        title: "Email",
        description: "O Email utilizado pela cliente",
        example: "Lednew_Telma@gmail.com",
        type: String
    })
    @IsEmail()
    @IsNotEmpty()
    email?: string;

    @ApiProperty({
        title: "Celular",
        description: "O celular de contato do cliente",
        example: "(18)99999-9999",
        type: String
    })
    @IsString()
    @IsNotEmpty()
    celular?: string;

    // @ApiProperty({
    //     title: "Endereços",
    //     description: "Endereço para entrega dos pedidos do cliente",
    //     example: {
    //         id: 1,
    //         rua: "teste",
    //         bairro: "teste",
    //         cidade: "teste",
    //         numero: "1284"
    //     }
    // })
    // endereco: Endereco;

    @ApiProperty({
        title: "Pedidos",
        description: "Pedidos feitos pelo cliente",
        example: [{
            data: {produtoId: 2},
            where: {id: 3}
        }]
    })
    pedidos?: Prisma.Enumerable<Prisma.PedidoUpdateManyWithWhereWithoutDadosOrdemInput>;


    @ApiProperty({
        title: "Forma de Pagamento",
        description: "Forma de pagamento para efetuar a compra dos produtos",
        example: {
            id: 1
        }
    })
    formaPagamento?: Prisma.FormaPagamentoWhereUniqueInput;
}

export class UpdateParamsDTO extends IntersectionType(
    UpdateDadosOrdemDTO,
    UpdateEnderecoDTO,
){}

