import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { JwtService } from "@nestjs/jwt";
import { Observable } from "rxjs";
import { ROLES_KEY } from "./decorators/roles.decorator";
import { Role } from "./enums/role.enum";


@Injectable()
export class RolesGuard implements CanActivate{
    constructor(private reflector: Reflector, private jwtService: JwtService){}

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
            context.getHandler(),
            context.getClass()
        ]);
        if(!requiredRoles){
            return true;
        }

        
        const { headers,user } = context.switchToHttp().getRequest();
        const { authorization } = headers;


        const decode = this.jwtService.decode(authorization.split(' ')[1],{ json: true });


        return requiredRoles === decode['role'];
    }
}