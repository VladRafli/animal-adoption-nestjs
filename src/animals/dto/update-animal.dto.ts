import { CreateAnimalDto } from './create-animal.dto';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateAnimalDto extends PartialType(CreateAnimalDto) {}
