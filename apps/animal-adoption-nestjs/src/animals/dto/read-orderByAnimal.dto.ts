import { Prisma } from '@prisma/client';
import { IsEnum, IsOptional } from 'class-validator';

export class ReadOrderByAnimalDto
  implements Prisma.AnimalOrderByWithRelationInput
{
  @IsOptional()
  @IsEnum(Prisma.SortOrder)
  id?: Prisma.SortOrder;

  @IsOptional()
  @IsEnum(Prisma.SortOrder)
  name?: Prisma.SortOrder;

  @IsOptional()
  @IsEnum(Prisma.SortOrder)
  age?: Prisma.SortOrder;

  @IsOptional()
  @IsEnum(Prisma.SortOrder)
  breed?: Prisma.SortOrder;

  @IsOptional()
  @IsEnum(Prisma.SortOrder)
  gender?: Prisma.SortOrder;
}
