import { uuid } from '@/_helper';
import { LocalStorageService } from '@/_provider/local-storage/local-storage.service';
import { PrismaService } from '@/_provider/prisma/prisma.service';
import { S3StorageService } from '@/_provider/s3-storage/s3-storage.service';
import { BadRequestException, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { CreateAnimalDto } from './dto/create-animal.dto';
import { UpdateAnimalDto } from './dto/update-animal.dto';

@Injectable()
export class AnimalsService {
  constructor(
    private prismaService: PrismaService,
    private localStorageService: LocalStorageService,
    private s3StorageService: S3StorageService,
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
          // await this.localStorageService.uploadFile(
          //   `${animalId}/${photo.type}/${photo.filename}`,
          //   Buffer.from(photo.buffer, 'base64'),
          // ),
          await this.s3StorageService.uploadFile(
            `animal/${animalId}/${photo.type}/${photo.filename}`,
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
                    path: uploadedFiles[idx].Location,
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

  async findOne(id: string) {
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

    if (animal === null) throw new BadRequestException('Animal not found');

    return animal;
  }

  async update(id: string, updateAnimalDto: UpdateAnimalDto) {
    const { animalPhoto, type, ...animalDto } = updateAnimalDto;
    const updatedAnimalPhoto = [];

    const animal = await this.prismaService.animal.findFirst({
      where: {
        id,
      },
    });

    if (animal === null) throw new BadRequestException('Animal not found');

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

          const uploadedFile = await this.s3StorageService.uploadFile(
            `animal/${id}/${photo.type}/${photo.filename}`,
            Buffer.from(photo.buffer, 'base64'),
          );

          updatedAnimalPhoto.push(
            await this.prismaService.animalPhoto.update({
              data: {
                path: uploadedFile.Location,
                type: photo.type,
              },
              where: {
                id: oldPhoto.id,
              },
            }),
          );
        } else {
          const uploadedFile = await this.s3StorageService.uploadFile(
            `animal/${id}/${photo.type}/${photo.filename}`,
            Buffer.from(photo.buffer, 'base64'),
          );

          updatedAnimalPhoto.push(
            await this.prismaService.animalPhoto.create({
              data: {
                id: uuid.v4(),
                path: uploadedFile.Location,
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

    const animalType = await this.prismaService.animalType.findFirst({
      where: {
        name: type,
      },
    });

    const updatedAnimal = await this.prismaService.animal.update({
      data: {
        animalType: {
          update: {
            id: animalType.id,
            name: animalType.name,
          },
        },
        ...animalDto,
      },
      where: {
        id,
      },
    });

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
