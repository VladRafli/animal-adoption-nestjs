import { Roles } from '@/_decorators';
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
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';
import { AnimalsService } from './animals.service';
import { CreateAnimalDto } from './dto/create-animal.dto';
import { ReadOrderByAnimalDto } from './dto/read-orderByAnimal.dto';
import { UpdateAnimalDto } from './dto/update-animal.dto';

@Controller({
  path: 'animal',
  version: '1',
})
@UseGuards(JwtAuthGuard, RolesGuard)
export class AnimalsController {
  constructor(private readonly animalsService: AnimalsService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @Roles('admin', 'shelter')
  @ApiCreatedResponse()
  async create(@Req() req, @Body() createAnimalDto: CreateAnimalDto) {
    return {
      statusCode: HttpStatus.CREATED,
      message: 'Successfully created animal',
      data: await this.animalsService.create(req.user.sub, createAnimalDto),
    };
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @Roles('admin', 'shelter', 'adopter')
  @ApiOkResponse({ isArray: true })
  async findAll(
    @Req() req,
    @Body() readOrderByAnimalDto: ReadOrderByAnimalDto,
    @Query('shelter') isShelter: string,
  ) {
    return {
      statusCode: HttpStatus.OK,
      message: 'Successfully retrieved all animals',
      data: await this.animalsService.findAll(
        isShelter === 'true' ? req.user.sub : undefined,
        req.query.skip !== undefined ? parseInt(req.query.skip) : undefined,
        req.query.take !== undefined ? parseInt(req.query.take) : undefined,
        readOrderByAnimalDto,
      ),
    };
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @Roles('admin', 'shelter', 'adopter')
  @ApiOkResponse()
  async findOne(@Param('id') id: string) {
    return {
      statusCode: HttpStatus.OK,
      message: 'Successfully retrieved animal',
      data: await this.animalsService.findOne(id),
    };
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  @Roles('admin', 'shelter')
  @ApiOkResponse()
  async update(
    @Param('id') id: string,
    @Body() updateAnimalDto: UpdateAnimalDto,
  ) {
    return {
      statusCode: HttpStatus.OK,
      message: 'Successfully updated animal',
      data: await this.animalsService.update(id, updateAnimalDto),
    };
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @Roles('admin', 'shelter')
  @ApiOkResponse()
  async remove(@Param('id') id: string) {
    return {
      statusCode: HttpStatus.OK,
      message: 'Successfully deleted animal',
      data: await this.animalsService.remove(id),
    };
  }
}
