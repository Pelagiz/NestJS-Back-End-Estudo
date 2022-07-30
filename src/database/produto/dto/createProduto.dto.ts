import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsBase64, IsInt, IsNotEmpty, IsString } from "class-validator";

export class CreateProdutoDTO{

    @ApiProperty({
        title: "Nome",
        description: "Nome do produto",
        example: "Arroz 2kg",
        type: String
    })
    @IsString()
    @IsNotEmpty()
    nome: string;

    @ApiProperty({
        title: "Quantidade",
        description: "Quantidade do produto em estoque",
        example: 10,
        type: String
    })
    @IsString()
    @IsNotEmpty()
    quantidade: string;

    @ApiProperty({
        title: "Preco Unitário",
        description: "Preço Unitário do produto",
        example: "19,80",
        type: String
    })
    @IsString()
    @IsNotEmpty()
    precoUnitario: string;

}

export class FileUploadDto {
    @ApiPropertyOptional({
        title: "Imagem",
        description: "Imagem do produto",
        type: 'string',
        format: 'binary',
    })
    imagem?: any
}
