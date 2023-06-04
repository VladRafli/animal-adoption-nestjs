import { AuthService } from '@/auth/auth.service';
import { JwtAuthGuard, JwtRefreshGuard, LocalAuthGuard } from '@/_guard';
import { RefreshSessionGuard } from '@/_guard/refreshSession.guard';
import { ms } from '@/_helper';
import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';
import { Throttle } from '@nestjs/throttler';
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
  async login(@Body() readLoginDto: ReadLoginDto) {
    const { filteredUser, ...tokens } = await this.authService.login(
      readLoginDto,
    );

    return {
      statusCode: HttpStatus.OK,
      message: 'Successfully logged in.',
      data: {
        user: filteredUser,
        ...tokens,
      },
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
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse()
  async logout(@Req() req) {
    return {
      statusCode: HttpStatus.OK,
      message: 'Successfully logged out.',
      data: await this.authService.logout(req.user.sub),
    };
  }

  @Post('/refresh')
  @UseGuards(JwtRefreshGuard, RefreshSessionGuard)
  @HttpCode(HttpStatus.CREATED)
  @ApiCreatedResponse()
  async refreshToken(@Req() req) {
    const userId = req.user.sub;
    const refreshToken =
      req.headers.authorization.split(' ')[1] || req.cookies.refresh_token;
    const newTokens = await this.authService.generateAccessToken(
      userId,
      refreshToken,
    );

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
  @UseGuards(JwtAuthGuard)
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
