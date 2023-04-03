import { AuthService } from '@/auth/auth.service';
import { JwtAuthGuard, LocalAuthGuard } from '@/_guard';
import { JwtRefreshGuard } from '@/_guard/jwt-refresh.guard';
import {
  BadRequestException,
  Body,
  Controller,
  ForbiddenException,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { CreateRefreshTokenDto } from './dto/create-refreshToken.dto';
import { CreateRegisterDto } from './dto/create-register.dto';
import { ReadLoginDto } from './dto/read-login.dto';

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

    if (loginResult === null) throw new ForbiddenException();

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
      message: 'Successfully logged in.',
      data: loginResult,
    };
  }

  @Post('/register')
  async register(@Body() createRegisterDto: CreateRegisterDto) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...result } = await this.authService.register(
      createRegisterDto,
    );

    if (result == null) throw new BadRequestException();

    return {
      message: 'Successfully registered new user.',
      data: result,
    };
  }
  // TODO: Forgot Password
  @Post('/forgot-password')
  @UseGuards(JwtAuthGuard)
  async forgotPassword(@Req() req: Request) {
    return 'Not Implemented';
  }

  @Post('/refresh')
  @UseGuards(JwtRefreshGuard)
  async refreshToken(
    @Req() req: Request,
    @Body() createRefreshTokenDto: CreateRefreshTokenDto,
  ) {
    const { userId } = createRefreshTokenDto;
    const refreshToken = req.headers.authorization.split(' ')[1];
    const newTokens = await this.authService.generateAccessToken(
      userId,
      refreshToken,
    );

    if (newTokens === null) throw new ForbiddenException();

    return {
      message: 'Successfully generate new token.',
      data: newTokens,
    };
  }
}
