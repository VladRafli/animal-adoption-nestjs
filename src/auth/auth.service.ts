import jwtConstants from '@/_constants/jwt.constants';
import { bcrypt, dayjs, uuid } from '@/_helper';
import { PrismaService } from '@/_provider/prisma/prisma.service';
import { MailerService } from '@nestjs-modules/mailer';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ReadLoginDto } from '../_dto/read-login.dto';
import { CreateForgotPasswordDto } from './dto/create-forgotPassword.dto';
import { CreateRegisterDto } from './dto/create-register.dto';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private prismaService: PrismaService,
    private mailerService: MailerService,
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
      expiresIn: '10m',
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
        token: bcrypt.hashSync(refreshToken, bcrypt.genSaltSync()),
        expiredAt: dayjs().add(7, 'day').format(),
      },
      update: {
        token: bcrypt.hashSync(refreshToken, bcrypt.genSaltSync()),
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

    if (existingUser) {
      return null;
    }

    user.password = await bcrypt.hash(user.password, bcrypt.genSaltSync());
    return await this.prismaService.user.create({
      data: {
        id: uuid.v4(),
        ...user,
      },
    });
  }

  async forgotPassword({ email }: CreateForgotPasswordDto) {
    const user = this.prismaService.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) return null;

    const sendEmail = await this.mailerService.sendMail({
      to: 'rafli.jaskandi@gmail.com', // list of receivers
      from: 'no-reply@adoptme.my.id', // sender address
      subject: 'Testing Nest MailerModule ✔', // Subject line
      text: 'welcome', // plaintext body
      html: '<b>welcome</b>', // HTML body content
    });

    return { sendEmail };
  }

  async generateAccessToken(userId: string, refreshToken: string) {
    const user = await this.prismaService.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) throw new ForbiddenException('Token is invalid.');

    const storedRefreshToken = await this.prismaService.refreshToken.findUnique(
      {
        where: {
          id: userId,
        },
      },
    );

    if (
      !storedRefreshToken ||
      !(await bcrypt.compare(refreshToken, storedRefreshToken.token))
    )
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
        token: bcrypt.hashSync(newRefreshToken, bcrypt.genSaltSync()),
        expiredAt: dayjs().add(7, 'day').format(),
      },
      where: {
        id: user.id,
      },
    });

    return {
      newAccessToken,
      newRefreshToken,
    };
  }

  async logout(userId: string) {
    const token = await this.prismaService.refreshToken.delete({
      where: {
        id: userId,
      },
    });

    if (!token) return null;

    return { token };
  }
}
