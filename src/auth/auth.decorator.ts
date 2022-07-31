import { applyDecorators, SetMetadata, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ApiBearerAuth, ApiUnauthorizedResponse } from "@nestjs/swagger";
import { Role } from "src/database/roles/enums/role.enum";
import { RolesGuard } from "src/database/roles/roles.guard";


export function Auth(roles: Role){
    return applyDecorators(
        SetMetadata('roles', roles),
        UseGuards(AuthGuard, RolesGuard),
        ApiBearerAuth(),
        ApiUnauthorizedResponse({
            description: "Usuário não possui cargo para realizar tal ação!",
        })
    )
}