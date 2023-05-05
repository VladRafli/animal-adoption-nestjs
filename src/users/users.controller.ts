import { Roles } from '@/_decorators';
import { RolesGuard } from '@/_guard';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import { JwtAuthGuard } from 'src/_guard/jwt-auth.guard';
import { UsersService } from './users.service';

@Controller({
  path: 'user',
  version: '1',
})
@ApiTags('Users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiCreatedResponse()
  create(@Body() user: Prisma.UserCreateInput) {
    return {
      message: 'Successfully created new user.',
      data: this.usersService.create(user),
    };
  }

  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiOkResponse({ isArray: true })
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin', 'adopter', 'shelter')
  @ApiOkResponse()
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Put(':username')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin', 'adopter', 'shelter')
  @ApiOkResponse()
  update(@Param('id') id: string, @Body() user: Prisma.UserUpdateInput) {
    return this.usersService.update(id, user);
  }

  @Delete(':username')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin', 'adopter', 'shelter')
  @ApiOkResponse()
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
