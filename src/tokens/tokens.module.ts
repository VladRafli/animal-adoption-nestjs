import { Module } from '@nestjs/common';
import { TokensService } from './tokens.service';
import { TokensController } from './tokens.controller';
import { JwtStrategy } from '@/_strategy';
import { PrismaModule, PrismaService } from '@/_provider';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [PrismaModule, PassportModule, JwtModule.register({})],
  controllers: [TokensController],
  providers: [TokensService, PrismaService, JwtStrategy],
})
export class TokensModule {}
