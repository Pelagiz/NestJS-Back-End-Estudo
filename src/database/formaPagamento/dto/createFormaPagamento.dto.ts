import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";


export class CreateFormaPagamentoDTO{
    
    @ApiProperty({
        title: "Forma de Pagamento",
        description: "As formas de pagamentos",
        example: "Pagamento em Dinheiro"
    })
    @IsString()
    @IsNotEmpty()
    formaPagamento: string;
}