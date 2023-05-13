import { Roles } from '@/_decorators';
import { RolesEnum } from '@/_enum';
import { JwtAuthGuard, RolesGuard } from '@/_guard';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';

@Controller({
  path: 'users',
  version: '1',
})
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiTags('Users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @Roles(RolesEnum.ADMIN)
  @HttpCode(HttpStatus.CREATED)
  @ApiCreatedResponse()
  async create(@Body() user: CreateUserDto) {
    return {
      statusCode: HttpStatus.CREATED,
      message: 'Successfully created new user.',
      data: await this.usersService.create(user),
    };
  }

  @Get()
  @Roles(RolesEnum.ADMIN)
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ isArray: true })
  async findAll() {
    return {
      statusCode: HttpStatus.OK,
      message: 'Successfully retrieved all users.',
      data: await this.usersService.findAll(),
    };
  }

  @Get(':id')
  @Roles(RolesEnum.ADMIN, RolesEnum.ADOPTER, RolesEnum.SHELTER)
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse()
  async findOne(@Param('id') id: string) {
    return {
      statusCode: HttpStatus.OK,
      message: 'Successfully retrieved user.',
      data: await this.usersService.findOne(id),
    };
  }

  @Put(':username')
  @Roles(RolesEnum.ADMIN, RolesEnum.ADOPTER, RolesEnum.SHELTER)
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse()
  async update(@Param('id') id: string, @Body() user: UpdateUserDto) {
    return {
      statusCode: HttpStatus.OK,
      message: 'Successfully updated user.',
      data: await this.usersService.update(id, user),
    };
  }

  @Delete(':username')
  @Roles(RolesEnum.ADMIN, RolesEnum.ADOPTER, RolesEnum.SHELTER)
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse()
  async remove(@Param('id') id: string) {
    return {
      statusCode: HttpStatus.OK,
      message: 'Successfully deleted user.',
      data: await this.usersService.remove(id),
    };
  }
}
