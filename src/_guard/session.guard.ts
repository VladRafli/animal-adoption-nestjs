import { PrismaService } from '@/_provider/prisma/prisma.service';
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

@Injectable()
export class SessionGuard implements CanActivate {
  constructor(private readonly prismaService: PrismaService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const { session, headers } = context.switchToHttp().getRequest();

    if (!session.user || !session.accessToken || !session.refreshToken)
      throw new UnauthorizedException();

    if (session.accessToken !== headers.authorization.replace('Bearer ', ''))
      throw new UnauthorizedException();

    const refreshToken = await this.prismaService.refreshToken.findFirst({
      where: {
        id: session.user.id,
      },
    });

    if (session.refreshToken !== refreshToken.token)
      throw new UnauthorizedException();

    return true;
  }
}
