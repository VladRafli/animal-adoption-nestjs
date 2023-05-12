import { AuthService } from '@/auth/auth.service';
import { JwtAuthGuard, JwtRefreshGuard, LocalAuthGuard } from '@/_guard';
import { RefreshSessionGuard } from '@/_guard/refreshSession.guard';
import { SessionGuard } from '@/_guard/session.guard';
import { ms } from '@/_helper';
import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Req,
  Res,
  Session,
  UseGuards,
} from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';
import { Throttle } from '@nestjs/throttler';
import { Response } from 'express';
import { CreateRegisterDto } from './dto/create-register.dto';
import { CreateResetPasswordDto } from './dto/create-resetPassword.dto';
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
  @ApiOkResponse()
  async login(
    @Body() readLoginDto: ReadLoginDto,
    @Res({ passthrough: true }) res: Response,
    @Session() session: Record<string, any>,
  ) {
    const loginResult = await this.authService.login(readLoginDto);

    session.user = loginResult.filteredUser;
    session.accessToken = loginResult.accessToken;
    session.refreshToken = loginResult.refreshToken;

    return {
      statusCode: HttpStatus.OK,
      message: 'Successfully logged in.',
      data: loginResult,
    };
  }

  @Post('/register')
  @HttpCode(HttpStatus.CREATED)
  @ApiCreatedResponse()
  async register(@Body() createRegisterDto: CreateRegisterDto) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...result } = await this.authService.register(
      createRegisterDto,
    );

    return {
      statusCode: HttpStatus.CREATED,
      message: 'Successfully registered new user.',
      data: result,
    };
  }

  @Post('/forgot-password')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse()
  async forgotPassword(@Req() req) {
    const sendEmail = await this.authService.forgotPassword(req.body);

    if (!sendEmail) throw new BadRequestException();

    return {
      statusCode: HttpStatus.OK,
      message: 'Successfully send reset password confirmation.',
      data: sendEmail,
    };
  }

  @Get('/reset-password/:token')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse()
  async validateResetPassword(@Param('token') token: string) {
    return {
      statusCode: HttpStatus.OK,
      message: 'Successfully validate reset password token.',
      data: await this.authService.validateResetPassword(token),
    };
  }

  @Post('/reset-password/:token')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse()
  async resetPassword(
    @Param('token') token: string,
    @Body() body: CreateResetPasswordDto,
  ) {
    return {
      statusCode: HttpStatus.OK,
      message: 'Successfully reset password.',
      data: await this.authService.resetPassword(token, body),
    };
  }

  @Post('/logout')
  @UseGuards(JwtAuthGuard, SessionGuard)
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse()
  async logout(
    @Req() req,
    @Res({ passthrough: true }) res: Response,
    @Session() session: Record<string, any>,
  ) {
    const token = await this.authService.logout(req.user.sub);

    return new Promise((resolve, reject) => {
      session.destroy((err) => {
        if (err)
          reject({
            statusCode: HttpStatus.BAD_REQUEST,
            message: 'Failed to logout.',
            data: err,
          });
        resolve({
          statusCode: HttpStatus.OK,
          message: 'Successfully logged out.',
          data: token,
        });
      });
    });
  }

  @Post('/refresh')
  @UseGuards(JwtRefreshGuard, RefreshSessionGuard)
  @HttpCode(HttpStatus.CREATED)
  @ApiCreatedResponse()
  async refreshToken(@Req() req, @Session() session: any) {
    const userId = req.user.sub;
    const refreshToken =
      req.headers.authorization.split(' ')[1] || req.cookies.refresh_token;
    const newTokens = await this.authService.generateAccessToken(
      userId,
      refreshToken,
    );

    session.user = newTokens.user;
    session.accessToken = newTokens.newAccessToken;
    session.refreshToken = newTokens.newRefreshToken;

    return {
      statusCode: HttpStatus.CREATED,
      message: 'Successfully generate new token.',
      data: {
        accessToken: newTokens.newAccessToken,
        refreshToken: newTokens.newRefreshToken,
      },
    };
  }

  @Get('/isloggedin')
  @UseGuards(JwtAuthGuard, SessionGuard)
  @HttpCode(HttpStatus.OK)
  @Throttle(20, ms('1m'))
  @ApiOkResponse()
  async isLoggedIn() {
    return {
      statusCode: HttpStatus.OK,
      message: 'User is logged in.',
      data: null,
    };
  }
}
