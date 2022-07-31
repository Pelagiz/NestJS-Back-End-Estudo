import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Prisma } from "@prisma/client";
import { Exclude } from "class-transformer";
import { IsBoolean, IsEmail, IsNotEmpty, IsString } from "class-validator";

export class CreateContaDTO{

    @ApiPropertyOptional({
        title: "Id",
        description: "O Id utilizado pela conta",
        example: "1",
        type: Number
    })
    id?: number;

    @ApiProperty({
        title: "Nome",
        description: "O nome usado pela conta",
        example: "Lednew",
        type: String
    })
    @IsString()
    @IsNotEmpty()
    nome: string;

    @ApiProperty({
        title: "Email",
        description: "O Email utilizado pela conta",
        example: "Lednew_Telma@gmail.com",
        type: String
    })
    @IsEmail()
    @IsNotEmpty()
    email: string;

    // Exclude
    @ApiProperty({
        title: "Senha",
        description: "A Senha utilizada pela conta",
        example: "Telminha",
        type: String
    })
    @IsString()
    @IsNotEmpty()
    senha: string;

    @ApiProperty({
        title: "Celular",
        description: "O Celular de contato com o usuário",
        example: "(18)99999-9999",
        type: String
    })
    @IsString()
    @IsNotEmpty()
    celular: string;


    @ApiProperty({
        title: "Verificação",
        description: "Verificação de conta",
        example: false,
        type: Boolean
    })
    @IsBoolean()
    @IsNotEmpty()
    is_verified: boolean;


    @ApiPropertyOptional({
        title: "Endereços",
        description: "Endereços cadastrados na conta",
        example: [
            {
                rua: "teste",
                bairro: "teste",
                cidade: "teste",
                numero: "1284"
            },
            {
                rua: "lednew seap",
                bairro: "adiemla",
                cidade: "utacutob",
                numero: "831"
            },
        ]
    })
    // Endereços cadastrados na conta
    enderecos?: Prisma.Enumerable<Prisma.EnderecoCreateManyContaInput>;

    @ApiProperty({
        title: "Roles",
        description: "O cargo possuido pelo usuário",
        example: {
            id: 1
        },
    })
    roles: Prisma.RolesWhereUniqueInput
}