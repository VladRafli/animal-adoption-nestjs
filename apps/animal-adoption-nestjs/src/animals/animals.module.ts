import { Module } from '@nestjs/common';
import { AnimalsService } from './animals.service';
import { AnimalsController } from './animals.controller';
import { JwtStrategy } from '@/_strategy';
import { LocalStorageService } from '@/_provider/local-storage/local-storage.service';
import { S3StorageService } from '@/_provider/s3-storage/s3-storage.service';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [],
  controllers: [AnimalsController],
  providers: [
    ConfigService,
    AnimalsService,
    LocalStorageService,
    S3StorageService,
    JwtStrategy,
  ],
})
export class AnimalsModule {}
