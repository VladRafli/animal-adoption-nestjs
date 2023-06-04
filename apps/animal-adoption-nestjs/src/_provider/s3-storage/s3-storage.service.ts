import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import AWS from 'aws-sdk';

@Injectable()
export class S3StorageService implements OnModuleInit {
  s3: AWS.S3;

  constructor(private configService: ConfigService) {}

  onModuleInit() {
    this.s3 = new AWS.S3({
      accessKeyId: this.configService.get<string>('AWS_ACCESS_KEY_ID'),
      secretAccessKey: this.configService.get<string>('AWS_SECRET_ACCESS_KEY'),
    });
  }

  async uploadFile(path: string, file: Buffer) {
    const params = {
      Bucket: this.configService.get<string>('AWS_BUCKET_NAME'),
      Key: path,
      Body: file,
    };
    return await this.s3.upload(params).promise();
  }

  async retrieveFile(path: string) {
    const params = {
      Bucket: this.configService.get<string>('AWS_BUCKET_NAME'),
      Key: path,
    };
    return await this.s3.getObject(params).promise();
  }

  async deleteFile(path: string) {
    const params = {
      Bucket: this.configService.get<string>('AWS_BUCKET_NAME'),
      Key: path,
    };
    return await this.s3.deleteObject(params).promise();
  }
}
