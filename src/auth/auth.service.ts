import jwtConstants from '@/_constants/jwt.constants';
import { bcrypt, dayjs, uuid } from '@/_helper';
import { PrismaService } from '@/_provider/prisma/prisma.service';
import { MailerService } from '@nestjs-modules/mailer';
import {
  ForbiddenException,
  BadRequestException,
  Injectable,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { CreateForgotPasswordDto } from './dto/create-forgotPassword.dto';
import { CreateRegisterDto } from './dto/create-register.dto';
import { CreateResetPasswordDto } from './dto/create-resetPassword.dto';
import { ReadLoginDto } from './dto/read-login.dto';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private prismaService: PrismaService,
    private mailerService: MailerService,
    private configService: ConfigService,
  ) {}

  async validateUser({ email, password }: ReadLoginDto): Promise<any> {
    const user = await this.prismaService.user.findFirst({
      where: {
        email: email,
      },
    });

    if (!user) return null;

    if (bcrypt.compareSync(password, user.password)) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user;
      return result;
    }

    return null;
  }

  async login({ email, password }: ReadLoginDto) {
    const user = await this.prismaService.user.findFirst({
      where: {
        email: email,
      },
    });

    if (!user || !bcrypt.compareSync(password, user.password)) {
      throw new ForbiddenException('Invalid credentials.');
    }

    const filteredUser = Object.keys(user)
      .filter((key) => key !== 'password')
      .reduce((obj, key) => {
        return {
          ...obj,
          [key]: user[key],
        };
      }, {});

    const payload = {
      sub: user.id,
      email: user.email,
      role: user.role,
    };

    const accessToken = await this.jwtService.signAsync(payload, {
      expiresIn: '1d',
      issuer: 'adoptme.my.id',
      secret: jwtConstants.JwtSecret,
    });

    const refreshToken = await this.jwtService.signAsync(payload, {
      expiresIn: '7d',
      issuer: 'adoptme.my.id',
      secret: jwtConstants.JwtRefreshSecret,
    });

    await this.prismaService.refreshToken.upsert({
      create: {
        id: user.id,
        token: refreshToken,
        expiredAt: dayjs().add(7, 'day').format(),
      },
      update: {
        token: refreshToken,
        expiredAt: dayjs().add(7, 'day').format(),
      },
      where: {
        id: user.id,
      },
    });

    return {
      accessToken,
      refreshToken,
      filteredUser,
    };
  }

  async register(user: CreateRegisterDto) {
    const existingUser = await this.prismaService.user.findUnique({
      where: {
        email: user.email,
      },
    });

    if (existingUser) throw new BadRequestException('User already exists.');

    user.password = await bcrypt.hash(user.password, bcrypt.genSaltSync());
    return await this.prismaService.user.create({
      data: {
        id: uuid.v4(),
        ...user,
      },
    });
  }

  async forgotPassword({ email }: CreateForgotPasswordDto) {
    const user = await this.prismaService.user.findFirst({
      where: {
        email,
      },
    });

    if (!user) throw new BadRequestException('User not found.');

    const resetPasswordToken =
      await this.prismaService.resetPasswordToken.create({
        data: {
          id: user.id,
          token: uuid.v4(),
          expiredAt: dayjs().add(1, 'day').format(),
        },
      });

    const sendEmail = await this.mailerService.sendMail({
      to: user.email,
      from: 'no-reply-Adoptme <rafli.jaskandi@gmail.com>',
      subject: 'Reset Password Link',
      html: `
        <h1>Adopt Me Account Reset Password</h1>
        <p>Click this link below to reset your password.</p>
        <p>If this request is not what you are going about, please do not click the link and contact our customer service.</p>
        <a href="${this.configService.get<string>(
          'CLIENT_URL',
        )}/reset-password?token=${resetPasswordToken.token}">Reset Password</a>
        <p>+62 XXX-XXXX-XXXX</p>
        <p>Adopt Me</p>
      `,
    });

    return sendEmail;
  }

  async validateResetPassword(token: string) {
    const storedToken = await this.prismaService.resetPasswordToken.findFirst({
      where: {
        token,
      },
    });

    if (!storedToken) throw new BadRequestException('Token is invalid.');

    return storedToken;
  }

  async resetPassword(token: string, { password }: CreateResetPasswordDto) {
    const storedToken = await this.prismaService.resetPasswordToken.findFirst({
      where: {
        token,
      },
    });

    if (!storedToken) throw new BadRequestException('Token is invalid.');

    const user = await this.prismaService.user.findUnique({
      where: {
        id: storedToken.id,
      },
    });

    if (!user) throw new BadRequestException('User not found.');

    if (bcrypt.compareSync(password, user.password))
      throw new BadRequestException('Password cannot be the same.');

    await this.prismaService.user.update({
      data: {
        password: await bcrypt.hash(password, bcrypt.genSaltSync()),
      },
      where: {
        id: storedToken.id,
      },
    });

    await this.prismaService.resetPasswordToken.delete({
      where: {
        id: storedToken.id,
      },
    });

    return storedToken;
  }

  async generateAccessToken(userId: string, refreshToken: string) {
    const user = await this.prismaService.user.findUnique({
      where: {
        id: userId,
      },
    });

    const storedRefreshToken = await this.prismaService.refreshToken.findFirst({
      where: {
        id: userId,
        revokedAt: null,
      },
    });

    if (!storedRefreshToken || refreshToken !== storedRefreshToken.token)
      throw new ForbiddenException('Token is invalid.');

    const payload = {
      sub: user.id,
      email: user.email,
      role: user.role,
    };

    const newAccessToken = await this.jwtService.signAsync(payload, {
      expiresIn: '10m',
      issuer: 'adoptme.my.id',
      secret: jwtConstants.JwtSecret,
    });

    const newRefreshToken = await this.jwtService.signAsync(payload, {
      expiresIn: '7d',
      issuer: 'adoptme.my.id',
      secret: jwtConstants.JwtRefreshSecret,
    });

    await this.prismaService.refreshToken.update({
      data: {
        token: newRefreshToken,
        expiredAt: dayjs().add(7, 'day').format(),
      },
      where: {
        id: user.id,
      },
    });

    return {
      newAccessToken,
      newRefreshToken,
      user,
    };
  }

  async logout(userId: string) {
    const token = await this.prismaService.refreshToken.delete({
      where: {
        id: userId,
      },
    });

    if (!token)
      throw new BadRequestException(
        'Cannot logout due to mismatch state in server.',
      );

    return token;
  }
}
