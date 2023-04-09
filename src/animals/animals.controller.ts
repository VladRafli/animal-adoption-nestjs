import { JwtAuthGuard } from '@/_guard';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AnimalsService } from './animals.service';
import { CreateAnimalDto } from './dto/create-animal.dto';
import { ReadOrderByAnimalDto } from './dto/read-orderByAnimal.dto';
import { UpdateAnimalDto } from './dto/update-animal.dto';

@Controller({
  path: 'animal',
  version: '1',
})
@UseGuards(JwtAuthGuard)
export class AnimalsController {
  constructor(private readonly animalsService: AnimalsService) {}

  @Post()
  async create(@Req() req, @Body() createAnimalDto: CreateAnimalDto) {
    return {
      status: 'success',
      message: 'Successfully created animal',
      data: await this.animalsService.create(req.user.sub, createAnimalDto),
    };
  }

  @Get()
  async findAll(
    @Req() req,
    @Body() readOrderByAnimalDto: ReadOrderByAnimalDto,
  ) {
    return {
      status: 'success',
      message: 'Successfully retrieved all animals',
      data: await this.animalsService.findAll(
        req.user.sub,
        req.query.skip !== undefined ? parseInt(req.query.skip) : undefined,
        req.query.take !== undefined ? parseInt(req.query.take) : undefined,
        readOrderByAnimalDto,
      ),
    };
  }

  @Get(':id')
  async findOne(@Req() req, @Param('id') id: string) {
    return {
      status: 'success',
      message: 'Successfully retrieved animal',
      data: await this.animalsService.findOne(id, req.user.sub),
    };
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateAnimalDto: UpdateAnimalDto,
  ) {
    return {
      status: 'success',
      message: 'Successfully updated animal',
      data: await this.animalsService.update(id, updateAnimalDto),
    };
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return {
      status: 'success',
      message: 'Successfully deleted animal',
      data: await this.animalsService.remove(id),
    };
  }
}
