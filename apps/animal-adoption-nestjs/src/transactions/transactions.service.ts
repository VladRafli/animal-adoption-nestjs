import { RolesEnum, TransactionStatus } from '@/_enum';
import { dayjs, uuid } from '@/_helper';
import { PrismaService } from '@/_provider';
import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateTransactionsDto } from './dto/create-transactions.dto';
import { UpdateTransactionsDto } from './dto/update-transactions.dto';

@Injectable()
export class TransactionsService {
  constructor(private prismaService: PrismaService) {}

  async create(createTransactionDto: CreateTransactionsDto) {
    const existingAnimalAdoption =
      await this.prismaService.adoptionTransaction.findFirst({
        where: {
          animalId: createTransactionDto.animalId,
        },
      });

    if (existingAnimalAdoption) {
      throw new BadRequestException('Animal already adopted.');
    }

    const isAnimalAvailable = await this.prismaService.animal.findFirst({
      where: {
        id: createTransactionDto.animalId,
        deletedAt: null,
      },
    });

    if (!isAnimalAvailable) {
      throw new BadRequestException('Animal not available.');
    }

    return await this.prismaService.adoptionTransaction.create({
      data: {
        id: uuid.v4(),
        status: TransactionStatus.REQUEST_RECIEVED,
        ...createTransactionDto,
      },
      include: {
        animal: {
          include: {
            animalPhoto: true,
            animalType: true,
          },
        },
        user: true,
      },
    });
  }

  async findAll(userId: string, role: string, skip: number, take: number) {
    if (role === RolesEnum.ADMIN) {
      return await this.prismaService.adoptionTransaction.findMany({
        include: {
          animal: {
            include: {
              animalPhoto: true,
              animalType: true,
            },
          },
          user: true,
        },
        skip,
        take,
      });
    }

    if (role === RolesEnum.ADOPTER) {
      return await this.prismaService.adoptionTransaction.findMany({
        where: {
          userId,
        },
        include: {
          animal: {
            include: {
              animalPhoto: true,
              animalType: true,
            },
          },
          user: true,
        },
        skip,
        take,
      });
    }

    if (role === RolesEnum.SHELTER) {
      return await this.prismaService.adoptionTransaction.findMany({
        where: {
          animal: {
            userId,
          },
        },
        include: {
          animal: {
            include: {
              user: true,
              animalPhoto: true,
              animalType: true,
            },
          },
          user: true,
        },
        skip,
        take,
      });
    }
  }

  async findOne(id: string, userId: string, role: string) {
    if (role === RolesEnum.ADMIN) {
      return await this.prismaService.adoptionTransaction.findFirst({
        where: {
          id,
        },
        include: {
          animal: {
            include: {
              user: true,
              animalPhoto: true,
              animalType: true,
            },
          },
          user: true,
        },
      });
    }

    if (role === RolesEnum.ADOPTER) {
      return await this.prismaService.adoptionTransaction.findFirst({
        where: {
          id,
          userId,
        },
        include: {
          animal: {
            include: {
              animalPhoto: true,
              animalType: true,
            },
          },
          user: true,
        },
      });
    }

    if (role === RolesEnum.SHELTER) {
      return await this.prismaService.adoptionTransaction.findFirst({
        where: {
          id,
          animal: {
            userId,
          },
        },
        include: {
          animal: {
            include: {
              animalPhoto: true,
              animalType: true,
            },
          },
          user: true,
        },
      });
    }
  }

  async update(id: string, updateTransactionDto: UpdateTransactionsDto) {
    if (updateTransactionDto.status === TransactionStatus.REQUEST_FINISHED) {
      // await this.prismaService.animal.update({
      //   data: {
      //     deletedAt: dayjs().toDate(),
      //   },
      //   where: {
      //     id,
      //   },
      // });
      return await this.prismaService.adoptionTransaction.update({
        data: {
          ...updateTransactionDto,
          animal: {
            update: {
              deletedAt: dayjs().toDate(),
            },
          },
        },
        where: {
          id,
        },
        include: {
          animal: {
            include: {
              animalPhoto: true,
              animalType: true,
            },
          },
          user: true,
        },
      });
    }

    return await this.prismaService.adoptionTransaction.update({
      data: {
        ...updateTransactionDto,
      },
      where: {
        id,
      },
      include: {
        animal: {
          include: {
            animalPhoto: true,
            animalType: true,
          },
        },
        user: true,
      },
    });
  }

  async remove(id: string) {
    return await this.prismaService.adoptionTransaction.delete({
      where: {
        id,
      },
      include: {
        animal: {
          include: {
            animalPhoto: true,
            animalType: true,
          },
        },
        user: true,
      },
    });
  }
}
