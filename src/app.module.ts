import { Module } from '@nestjs/common';
import { AuthenticationModule } from './authentication/authentication.module';
import { UsersService } from './users/users.service';
import { UsersModule } from './users/users.module';

@Module({
  imports: [AuthenticationModule, UsersModule],
  providers: [UsersService],
})
export class AppModule {}
