import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { ImagesController } from 'src/images/images.controller';

@Module({
  imports: [MulterModule.register()],
  controllers: [ImagesController]
})
export class ImagesModule { }
