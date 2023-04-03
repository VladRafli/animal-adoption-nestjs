import { AnimalGender, Prisma } from '@prisma/client';

export class UpdateAnimalDto implements Prisma.AnimalUpdateInput {
  id?: string | Prisma.StringFieldUpdateOperationsInput;
  name?: string | Prisma.StringFieldUpdateOperationsInput;
  age?: number | Prisma.IntFieldUpdateOperationsInput;
  breed?: string | Prisma.StringFieldUpdateOperationsInput;
  description?: string | Prisma.NullableStringFieldUpdateOperationsInput;
  gender?: Prisma.EnumAnimalGenderFieldUpdateOperationsInput | AnimalGender;
  createdAt?: string | Prisma.DateTimeFieldUpdateOperationsInput | Date;
  updatedAt?: string | Prisma.DateTimeFieldUpdateOperationsInput | Date;
  deletedAt?: string | Prisma.NullableDateTimeFieldUpdateOperationsInput | Date;
  user?: Prisma.UserUpdateOneRequiredWithoutAnimalNestedInput;
  animalType?: Prisma.AnimalTypeUpdateOneRequiredWithoutAnimalNestedInput;
  AnimalPhoto?: Prisma.AnimalPhotoUpdateManyWithoutAnimalNestedInput;
}
