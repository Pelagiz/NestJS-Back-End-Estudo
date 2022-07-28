import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { AuthService } from "./auth.service";
import { LocalAuthDTO } from "./dto/localAuth.dto";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy){
    constructor(private authService: AuthService){
        super();
    }

    async validate(username: string, password: string): Promise<any>{
        const conta = await this.authService.validateUser(username, password);
        if(!conta){
            throw new UnauthorizedException();
        }
        
        return conta;
    }
}