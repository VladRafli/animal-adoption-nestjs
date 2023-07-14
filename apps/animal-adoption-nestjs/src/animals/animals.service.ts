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
    const { type, animalPhoto, animalCertificate, ...animalDto } =
      createAnimalDto;
    const uploadedAnimalPhotos = [];
    const uploadedAnimalCertificates = [];
    const animalId = uuid.v4();

    const animalType = await this.prismaService.animalType.findFirst({
      where: {
        name: type,
        deletedAt: null, // If Soft deleted
      },
    });

    if (animalPhoto !== undefined) {
      for (const photo of animalPhoto) {
        uploadedAnimalPhotos.push(
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

    if (animalCertificate !== undefined) {
      for (const certificate of animalCertificate) {
        uploadedAnimalCertificates.push(
          // await this.localStorageService.uploadFile(
          //   `${animalId}/${certificate.type}/${certificate.filename}`,
          //   Buffer.from(certificate.buffer, 'base64'),
          // ),
          await this.s3StorageService.uploadFile(
            `animal/${animalId}/${certificate.type}/${certificate.filename}`,
            Buffer.from(certificate.buffer, 'base64'),
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
                    path: uploadedAnimalPhotos[idx].Location,
                    type: val.type,
                  }))
                : [],
          },
        },
        animalCertificate: {
          createMany: {
            data:
              animalCertificate !== undefined
                ? animalCertificate.map((val, idx) => ({
                    id: uuid.v4(),
                    path: uploadedAnimalCertificates[idx].Location,
                    type: val.type,
                    description: val.description,
                  }))
                : [],
          },
        },
        ...animalDto,
      },
      include: {
        animalPhoto: true,
        animalType: true,
        animalCertificate: true,
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
        animalCertificate: true,
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
        animalCertificate: true,
      },
    });

    if (animal === null) throw new BadRequestException('Animal not found');

    return animal;
  }

  async update(id: string, updateAnimalDto: UpdateAnimalDto) {
    const { animalPhoto, animalCertificate, type, ...animalDto } =
      updateAnimalDto;
    const updatedAnimalPhoto = [];
    const updatedAnimalCertificate = [];

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

    if (animalCertificate !== undefined) {
      for (const certificate of animalCertificate) {
        const oldCertificate =
          await this.prismaService.animalCertificate.findFirst({
            where: {
              animalId: id,
              type: certificate.type,
              deletedAt: null, // If Soft deleted
            },
          });

        if (oldCertificate) {
          await this.localStorageService.deleteFile(oldCertificate.path);

          const uploadedFile = await this.s3StorageService.uploadFile(
            `animal/${id}/${certificate.type}/${certificate.filename}`,
            Buffer.from(certificate.buffer, 'base64'),
          );

          updatedAnimalCertificate.push(
            await this.prismaService.animalCertificate.update({
              data: {
                path: uploadedFile.Location,
                type: certificate.type,
                description: certificate.description,
              },
              where: {
                id: oldCertificate.id,
              },
            }),
          );
        } else {
          const uploadedFile = await this.s3StorageService.uploadFile(
            `animal/${id}/${certificate.type}/${certificate.filename}`,
            Buffer.from(certificate.buffer, 'base64'),
          );

          updatedAnimalCertificate.push(
            await this.prismaService.animalCertificate.create({
              data: {
                id: uuid.v4(),
                path: uploadedFile.Location,
                type: certificate.type,
                description: certificate.description,
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
        animalCertificate: updatedAnimalCertificate,
      },
    };
  }

  async remove(id: string) {
    let deletedAnimalPhoto: any;
    let deletedAnimalCertificate: any;
    const animal = await this.prismaService.animal.findFirst({
      where: {
        id,
        deletedAt: null, // If Soft deleted
      },
    });

    if (animal === null) {
      throw new BadRequestException('Animal not found');
    }

    const oldAnimalPhoto = await this.prismaService.animalPhoto.findMany({
      where: {
        animalId: id,
        deletedAt: null, // If Soft deleted
      },
    });

    if (oldAnimalPhoto) {
      oldAnimalPhoto.forEach(async (val) => {
        await this.localStorageService.deleteFile(val.path);
      });

      deletedAnimalPhoto = await this.prismaService.animalPhoto.deleteMany({
        where: {
          animalId: id,
        },
      });
    }

    const oldAnimalCertificate =
      await this.prismaService.animalCertificate.findMany({
        where: {
          animalId: id,
          deletedAt: null, // If Soft deleted
        },
      });

    if (oldAnimalCertificate) {
      oldAnimalCertificate.forEach(async (val) => {
        await this.localStorageService.deleteFile(val.path);
      });

      deletedAnimalCertificate =
        await this.prismaService.animalCertificate.deleteMany({
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
      deletedAnimalPhoto,
      deletedAnimalCertificate,
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
