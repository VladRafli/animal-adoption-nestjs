import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { AnimalsService } from './animals.service';

@Controller({
  path: 'animal',
  version: '1',
})
export class AnimalsController {
  constructor(private readonly animalsService: AnimalsService) {}

  @Post()
  create(@Body() animal: Prisma.AnimalCreateInput) {
    return this.animalsService.create(animal);
  }

  @Get()
  findAll() {
    return this.animalsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.animalsService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() animal: Prisma.AnimalUpdateInput) {
    return this.animalsService.update(+id, animal);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.animalsService.remove(+id);
  }
}
