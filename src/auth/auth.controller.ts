import { AuthService } from '@/auth/auth.service';
import { ReadLoginDto } from '@/_dto';
import { JwtAuthGuard, JwtRefreshGuard, LocalAuthGuard } from '@/_guard';
import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Post,
  Req,
  Res,
  Session,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
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
  async register(@Body() createRegisterDto: CreateRegisterDto) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...result } = await this.authService.register(
      createRegisterDto,
    );

    if (!result) throw new BadRequestException();

    return {
      statusCode: HttpStatus.CREATED,
      message: 'Successfully registered new user.',
      data: result,
    };
  }
  // TODO: Link for reset password
  @Post('/forgot-password')
  @HttpCode(HttpStatus.OK)
  async forgotPassword(@Req() req) {
    const sendEmail = this.authService.forgotPassword(req.body);

    if (!sendEmail) throw new BadRequestException();

    return {
      statusCode: HttpStatus.OK,
      message: 'Successfully send reset password confirmation.',
      data: sendEmail,
    };
  }
  // TODO: Validate Reset password action
  @Get('/reset-password')
  @HttpCode(HttpStatus.OK)
  async validateResetPassword(@Req() req) {
    // const validate = this.authService.validateResetPassword(req.query);
    throw new HttpException('Not implemented yet.', HttpStatus.NOT_IMPLEMENTED);
  }

  @Post('/logout')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  async logout(
    @Req() req,
    @Res({ passthrough: true }) res: Response,
    @Session() session: Record<string, any>,
  ) {
    const token = this.authService.logout(req.user.sub);

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
  @UseGuards(JwtRefreshGuard)
  @HttpCode(HttpStatus.CREATED)
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
      data: newTokens,
    };
  }

  @Get('/isloggedin')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  async isLoggedIn() {
    return {
      statusCode: HttpStatus.OK,
      message: 'User is logged in.',
      data: null,
    };
  }
}
