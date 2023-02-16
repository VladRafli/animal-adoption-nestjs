import { ApiProperty } from '@nestjs/swagger';
import { User } from '@prisma/client';

export class UserEntity implements User {
  @ApiProperty({ required: false })
  id: number;

  @ApiProperty({ required: true })
  username: string;

  @ApiProperty({ required: true })
  password: string;

  @ApiProperty({ required: false, readOnly: true })
  createdAt: Date;

  @ApiProperty({ required: false, readOnly: true })
  updatedAt: Date;

  @ApiProperty({ required: false, readOnly: true })
  deletedAt: Date;
}
