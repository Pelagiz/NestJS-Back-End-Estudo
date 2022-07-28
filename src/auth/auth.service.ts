import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Conta } from '@prisma/client';
import { ContaService } from 'src/database/conta/conta.service';
import { LocalAuthDTO } from './dto/localAuth.dto';

@Injectable()
export class AuthService {
    constructor(
        private contaService: ContaService,
        private jwtService: JwtService
        ){}

    async validateUser(email: string, senha: string): Promise<any>{
        const conta = await this.contaService.find({
            email
        });


        if(conta && conta.senha === senha){
            const { senha, ...result} = conta;
            return result;
        }

        return null;
    }

    async login(user: any){

        const payload = { username: user.username, sub: user.id};

        return {
            access_token: this.jwtService.sign(payload)
        }
    }
}
