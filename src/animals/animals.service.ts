import { uuid } from '@/_helper';
import { LocalStorageService } from '@/_provider/local-storage/local-storage.service';
import { PrismaService } from '@/_provider/prisma/prisma.service';
import { BadRequestException, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { CreateAnimalDto } from './dto/create-animal.dto';
import { UpdateAnimalDto } from './dto/update-animal.dto';

@Injectable()
export class AnimalsService {
  constructor(
    private prismaService: PrismaService,
    private localStorageService: LocalStorageService,
  ) {}

  async create(userId: string, createAnimalDto: CreateAnimalDto) {
    const { type, animalPhoto, ...animalDto } = createAnimalDto;
    const uploadedFiles = [];
    const animalId = uuid.v4();

    const animalType = await this.prismaService.animalType.findFirst({
      where: {
        name: type,
        deletedAt: null, // If Soft deleted
      },
    });

    if (animalPhoto !== undefined) {
      for (const photo of animalPhoto) {
        uploadedFiles.push(
          await this.localStorageService.uploadFile(
            `${animalId}/${photo.type}/${photo.filename}`,
            Buffer.from(photo.buffer, 'base64'),
          ),
        );
      }
    }

    return await this.prismaService.animal.create({
      data: {
        id: animalId,
        user: {
          connect: {
            id: userId,
          },
        },
        animalType: {
          connect: {
            id: animalType.id,
          },
        },
        animalPhoto: {
          createMany: {
            data:
              animalPhoto !== undefined
                ? animalPhoto.map((val, idx) => ({
                    id: uuid.v4(),
                    extension: uploadedFiles[idx].extension,
                    path: uploadedFiles[idx].path,
                    size: uploadedFiles[idx].size,
                    type: val.type,
                  }))
                : [],
          },
        },
        ...animalDto,
      },
      include: {
        animalPhoto: true,
        animalType: true,
        user: true,
      },
    });
  }

  async findAll(
    userId: string,
    skip?: number,
    take?: number,
    orderBy?: Prisma.Enumerable<Prisma.AnimalOrderByWithRelationInput>,
  ) {
    const user = await this.prismaService.user.findFirst({
      where: {
        id: userId,
        deletedAt: null, // If Soft deleted
      },
    });

    if (user.role === 'admin') {
      const animal = await this.prismaService.animal.findMany({
        where: {
          deletedAt: null, // If Soft deleted
        },
        include: {
          animalPhoto: true,
          animalType: true,
        },
        skip,
        take,
        orderBy,
      });

      if (animal === null) {
        throw new BadRequestException('Animal not found');
      }

      return animal;
    }

    const animal = await this.prismaService.animal.findMany({
      where: {
        userId,
        deletedAt: null, // If Soft deleted
      },
      include: {
        animalPhoto: true,
        animalType: true,
      },
      skip,
      take,
      orderBy,
    });

    if (animal === null) {
      throw new BadRequestException('Animal not found');
    }

    return animal;
  }

  async findOne(id: string, userId: string) {
    const user = await this.prismaService.user.findFirst({
      where: {
        id: userId,
        deletedAt: null, // If Soft deleted
      },
    });

    if (user.role === 'admin') {
      const animal = await this.prismaService.animal.findFirst({
        where: {
          id,
          deletedAt: null, // If Soft deleted
        },
        include: {
          animalPhoto: true,
          animalType: true,
        },
      });

      if (animal === null) {
        throw new BadRequestException('Animal not found');
      }

      return animal;
    }

    const animal = await this.prismaService.animal.findFirst({
      where: {
        userId,
        id,
        deletedAt: null, // If Soft deleted
      },
      include: {
        animalPhoto: true,
        animalType: true,
      },
    });

    if (animal === null) {
      throw new BadRequestException('Animal not found');
    }

    return animal;
  }

  async update(id: string, updateAnimalDto: UpdateAnimalDto) {
    const { animalPhoto, ...animalDto } = updateAnimalDto;
    const updatedAnimalPhoto = [];

    const animal = await this.prismaService.animal.findFirst({
      where: {
        id,
      },
    });

    if (animal === null) {
      throw new BadRequestException('Animal not found');
    }

    if (animalPhoto !== undefined) {
      for (const photo of animalPhoto) {
        const oldPhoto = await this.prismaService.animalPhoto.findFirst({
          where: {
            animalId: id,
            type: photo.type,
            deletedAt: null, // If Soft deleted
          },
        });

        if (oldPhoto) {
          await this.localStorageService.deleteFile(oldPhoto.path);

          const uploadedFile = await this.localStorageService.uploadFile(
            `${id}/${photo.type}/${photo.filename}`,
            Buffer.from(photo.buffer, 'base64'),
          );

          updatedAnimalPhoto.push(
            await this.prismaService.animalPhoto.update({
              data: {
                extension: uploadedFile.extension,
                path: uploadedFile.path,
                size: uploadedFile.size,
                type: photo.type,
              },
              where: {
                id: oldPhoto.id,
              },
            }),
          );
        } else {
          const uploadedFile = await this.localStorageService.uploadFile(
            `${id}/${photo.type}/${photo.filename}`,
            Buffer.from(photo.buffer, 'base64'),
          );

          updatedAnimalPhoto.push(
            await this.prismaService.animalPhoto.create({
              data: {
                id: uuid.v4(),
                extension: uploadedFile.extension,
                path: uploadedFile.path,
                size: uploadedFile.size,
                type: photo.type,
                animal: {
                  connect: {
                    id,
                  },
                },
              },
            }),
          );
        }
      }
    }

    const updatedAnimal = await this.prismaService.animal.update({
      data: animalDto,
      where: {
        id,
      },
    });

    // const updatedAnimalPhoto = await this.prismaService.animalPhoto.updateMany({
    //   data:
    //     animalPhoto !== undefined
    //       ? animalPhoto.map((val, idx) => ({
    //           extension: uploadedFiles[idx].extension,
    //           path: uploadedFiles[idx].path,
    //           size: uploadedFiles[idx].size,
    //           type: val.type,
    //         }))
    //       : [],
    //   where: {
    //     animalId: id,
    //     deletedAt: null, // If Soft deleted
    //   },
    // });

    return {
      animal: {
        ...updatedAnimal,
        animalPhoto: updatedAnimalPhoto,
      },
    };
  }

  async remove(id: string) {
    let deletedAnimalPhoto;
    const animal = await this.prismaService.animal.findFirst({
      where: {
        id,
        deletedAt: null, // If Soft deleted
      },
    });

    if (animal === null) {
      throw new BadRequestException('Animal not found');
    }

    const oldPhoto = await this.prismaService.animalPhoto.findMany({
      where: {
        animalId: id,
        deletedAt: null, // If Soft deleted
      },
    });

    if (oldPhoto) {
      oldPhoto.forEach(async (val) => {
        await this.localStorageService.deleteFile(val.path);
      });

      deletedAnimalPhoto = await this.prismaService.animalPhoto.deleteMany({
        where: {
          animalId: id,
        },
      });
    }

    const deletedAnimal = await this.prismaService.animal.delete({
      where: {
        id,
        
      },
    });

    return {
      ...deletedAnimal,
      deletedAnimalPhoto: deletedAnimalPhoto,
    };

    // Soft delete
    // return await this.prismaService.animal.update({
    //   data: {
    //     deletedAt: dayjs().format(),
    //   },
    //   where: {
    //     id,
    //   },
    // });
  }
}
