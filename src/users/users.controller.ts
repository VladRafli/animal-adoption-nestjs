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
import { Roles } from 'src/_decorators/role.decorator';
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
  @UseGuards(JwtAuthGuard)
  @Roles('admin', 'adopter', 'shelter')
  @ApiCreatedResponse()
  create(@Body() user: Prisma.UserCreateInput) {
    return {
      message: 'Successfully created new user.',
      data: this.usersService.create(user),
    };
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @Roles('admin', 'adopter', 'shelter')
  @ApiOkResponse({ isArray: true })
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':username')
  @UseGuards(JwtAuthGuard)
  @Roles('admin', 'adopter', 'shelter')
  @ApiOkResponse()
  findOne(@Param('username') username: string) {
    return this.usersService.findOne(username);
  }

  @Put(':username')
  @UseGuards(JwtAuthGuard)
  @Roles('admin', 'adopter', 'shelter')
  @ApiOkResponse()
  update(
    @Param('username') username: string,
    @Body() user: Prisma.UserUpdateInput,
  ) {
    return this.usersService.update(username, user);
  }

  @Delete(':username')
  @UseGuards(JwtAuthGuard)
  @Roles('admin', 'adopter', 'shelter')
  @ApiOkResponse()
  remove(@Param('username') username: string) {
    return this.usersService.remove(username);
  }
}
