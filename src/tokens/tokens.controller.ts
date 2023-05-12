import { Roles } from '@/_decorators';
import { RolesEnum } from '@/_enum';
import { JwtAuthGuard, RolesGuard, SessionGuard } from '@/_guard';
import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { RevokeTokenDto } from './dto/revoke-token.dto';
import { TokensService } from './tokens.service';

@Controller({
  path: 'tokens',
  version: '1',
})
@ApiTags('Tokens')
export class TokensController {
  constructor(private readonly tokensService: TokensService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard, SessionGuard, RolesGuard)
  @Roles(RolesEnum.ADMIN)
  @ApiOkResponse()
  async findAll() {
    return {
      statusCode: HttpStatus.OK,
      message: 'Tokens retrieved successfully',
      data: await this.tokensService.findAll(),
    };
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard, SessionGuard, RolesGuard)
  @Roles(RolesEnum.ADMIN)
  @ApiOkResponse()
  async findOne(@Param('id') id: string) {
    return {
      statusCode: HttpStatus.OK,
      message: 'Token retrieved successfully',
      data: await this.tokensService.findOne(id),
    };
  }

  @Post('/revoke')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard, SessionGuard, RolesGuard)
  @Roles(RolesEnum.ADMIN)
  @ApiOkResponse()
  async revoke(@Body() revokeTokenDto: RevokeTokenDto) {
    return {
      statusCode: HttpStatus.OK,
      message: 'Token revoked',
      data: await this.tokensService.revokeToken(revokeTokenDto.id),
    };
  }
}
