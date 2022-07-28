import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsNumber } from "class-validator";


export class CreatePedidoDTO{
    @ApiProperty({
        title: "ID",
        description: "ID",
        type: Number
    })
    @IsNumber()
    id?: number;


    @ApiProperty({
        title: "Data Efetuada",
        description: "Data efetuada do pedido",
        type: Number
    })
    @IsDate()
    data_efetuada?: Date;

    @ApiProperty({
        title: "Data Efetuada",
        description: "Data que o pedido foi entregue",
        type: Number
    })
    @IsDate()
    data_entregada?: Date;

    @ApiProperty({
        title: "ProdutoId",
        description: "ProdutoId",
        type: Number
    })
    produtoId: number;
}