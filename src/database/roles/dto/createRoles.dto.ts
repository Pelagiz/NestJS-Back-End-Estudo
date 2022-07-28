import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export enum RolesEnum {
    Administrador = "Administrador",
    Usuario = "Usuario",
}


export class CreateRolesDTO{
    @ApiProperty({
        "title": "Role",
        "description": "Cargos",
        "example": "Administrador",
    })
    @IsString()
    @IsNotEmpty()
    role: string
}