import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";


export class CreateEnderecoDTO{
    @ApiProperty({
        title: "ID",
        description: "ID",
        type: Number
    })
    @IsNumber()
    id?: number;

    @ApiProperty({
        title: "Rua",
        description: "Rua",
        type: String,
        example: "teste"
    })
    @IsString()
    @IsNotEmpty()
    rua: string;

    @ApiProperty({
        title: "Bairro",
        description: "Bairro",
        type: String,
        example: "teste"
    })
    @IsString()
    @IsNotEmpty()
    bairro: string;

    @ApiProperty({
        title: "Cidade",
        description: "Cidade",
        type: String,
        example: "teste"
    })
    @IsString()
    @IsNotEmpty()
    cidade: string;

    @ApiProperty({
        title: "Numero",
        description: "Numero",
        type: String,
        example: "24828"
    })
    @IsString()
    @IsNotEmpty()
    numero: string;
}