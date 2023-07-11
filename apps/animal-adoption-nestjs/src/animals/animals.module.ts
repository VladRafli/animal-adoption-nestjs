import { LocalStorageService } from '@/_provider/local-storage/local-storage.service';
import { S3StorageService } from '@/_provider/s3-storage/s3-storage.service';
import { JwtStrategy } from '@/_strategy';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AnimalsController } from './animals.controller';
import { AnimalsService } from './animals.service';

@Module({
  imports: [PassportModule, JwtModule.register({})],
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
