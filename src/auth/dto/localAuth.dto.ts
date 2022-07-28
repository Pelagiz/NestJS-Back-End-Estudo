import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class LocalAuthDTO{

    @ApiProperty({
        title: "Username",
        description: "Identificação do usuário",
        type: String,
        example: "Lednew_Telma@gmail.com"
    })
    @IsString()
    @IsNotEmpty()
    username: string;

    @ApiProperty({
        title: "Senha",
        description: "Senha do Usuário",
        type: String,
        example: "Telminha"
    })
    @IsString()
    @IsNotEmpty()
    password: string;
}