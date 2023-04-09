import { Module } from '@nestjs/common';
import { AnimalsService } from './animals.service';
import { AnimalsController } from './animals.controller';
import { JwtStrategy } from '@/_strategy';
import { LocalStorageService } from '@/_provider/local-storage/local-storage.service';

@Module({
  imports: [],
  controllers: [AnimalsController],
  providers: [AnimalsService, LocalStorageService, JwtStrategy],
})
export class AnimalsModule {}
