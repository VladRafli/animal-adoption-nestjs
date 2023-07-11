import { PrismaService } from '@/_provider';
import { JwtStrategy } from '@/_strategy';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ChatController } from './chat.controller';
import { ChatService } from './chat.service';

@Module({
  imports: [PassportModule, JwtModule.register({})],
  controllers: [ChatController],
  providers: [ChatService, PrismaService, JwtStrategy],
})
export class ChatModule {}
