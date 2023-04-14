import { AuthService } from '@/auth/auth.service';
import { ReadLoginDto } from '@/_dto';
import { JwtAuthGuard, LocalAuthGuard, JwtRefreshGuard } from '@/_guard';
import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  HttpException,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { CreateRegisterDto } from './dto/create-register.dto';

@Controller({
  path: 'auth',
  version: '1',
})
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/login')
  @UseGuards(LocalAuthGuard)
  @HttpCode(HttpStatus.OK)
  async login(
    @Body() readLoginDto: ReadLoginDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const loginResult = await this.authService.login(readLoginDto);

    res.cookie('access_token', loginResult.accessToken, {
      httpOnly: true,
      secure: true,
      signed: true,
      sameSite: true,
    });

    res.cookie('refresh_token', loginResult.refreshToken, {
      path: '/auth/refresh',
      httpOnly: true,
      secure: true,
      signed: true,
      sameSite: true,
    });

    return {
      statusCode: HttpStatus.OK,
      message: 'Successfully logged in.',
      data: loginResult,
    };
  }

  @Post('/register')
  @HttpCode(HttpStatus.CREATED)
  async register(@Body() createRegisterDto: CreateRegisterDto) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...result } = await this.authService.register(
      createRegisterDto,
    );

    if (result == null) throw new BadRequestException();

    return {
      statusCode: HttpStatus.CREATED,
      message: 'Successfully registered new user.',
      data: result,
    };
  }
  // TODO: Forgot Password
  @Post('/forgot-password')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.NOT_IMPLEMENTED)
  async forgotPassword() {
    throw new HttpException('Not implemented', HttpStatus.NOT_IMPLEMENTED);
  }

  @Post('/refresh')
  @UseGuards(JwtRefreshGuard)
  @HttpCode(HttpStatus.CREATED)
  async refreshToken(@Req() req) {
    const userId = req.user.sub;
    const refreshToken = req.headers.authorization.split(' ')[1];
    const newTokens = await this.authService.generateAccessToken(
      userId,
      refreshToken,
    );

    return {
      statusCode: HttpStatus.CREATED,
      message: 'Successfully generate new token.',
      data: newTokens,
    };
  }
}
