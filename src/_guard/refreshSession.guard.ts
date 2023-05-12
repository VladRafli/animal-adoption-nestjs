import { PrismaService } from '@/_provider/prisma/prisma.service';
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

@Injectable()
export class RefreshSessionGuard implements CanActivate {
  constructor(private readonly prismaService: PrismaService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const { headers, user } = context.switchToHttp().getRequest();

    const refreshToken = await this.prismaService.refreshToken.findFirst({
      where: {
        id: user.sub,
      },
    });

    if (headers.authorization.replace('Bearer ', '') !== refreshToken.token)
      throw new UnauthorizedException();

    return true;
  }
}
