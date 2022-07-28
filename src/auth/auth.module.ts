import { Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ContaService } from 'src/database/conta/conta.service';
import { PrismaService } from 'src/database/prisma.service';
import { AuthService } from './auth.service';
import { jwtConstants } from './constants';
import { JwtStrategy } from './jwt.strategy';
import { LocalStrategy } from './local.strategy';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1h'}
    })
  ],
  providers: [PrismaService, AuthService, LocalStrategy, JwtStrategy ,ContaService],
  exports: [AuthService]
})
export class AuthModule {}
