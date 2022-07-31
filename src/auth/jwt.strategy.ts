import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { PrismaService } from "src/database/prisma.service";
import { jwtConstants } from "./constants";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(private prismaService: PrismaService){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: jwtConstants.secret,
        });
    }

    async validate(payload: any){

        const user = await this.prismaService.conta.findUnique({
            where: {
                email: payload.username
            },
            include: {
                Role: true
            }
        });

        return { userId: payload.sub, username: payload.username, role: payload.role };
    }
}