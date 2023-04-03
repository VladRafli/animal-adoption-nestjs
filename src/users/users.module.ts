import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaModule } from 'src/_provider/prisma/prisma.module';
import { PrismaService } from 'src/_provider/prisma/prisma.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from 'src/_strategy/jwt.strategy';
import { JwtRefreshStrategy } from 'src/_strategy/jwtRefresh.strategy';
import { JwtAuthGuard } from 'src/_guard/jwt-auth.guard';
import { RolesGuard } from 'src/_guard/roles.guard';

@Module({
  imports: [PrismaModule, PassportModule, JwtModule.register({})],
  controllers: [UsersController],
  providers: [
    UsersService,
    PrismaService,
    JwtStrategy,
    JwtRefreshStrategy,
    JwtAuthGuard,
    RolesGuard,
  ],
})
export class UsersModule {}
