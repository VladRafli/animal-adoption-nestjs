import { Module, Global } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { S3StorageService } from './s3-storage.service';

@Global()
@Module({
  providers: [S3StorageService, ConfigService],
  exports: [S3StorageService],
})
export class S3StorageModule {}
