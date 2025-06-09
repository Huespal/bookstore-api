import {
  Controller, HttpStatus, ParseFilePipeBuilder,
  Post, Req, UploadedFile, UseInterceptors
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { FileInterceptor } from '@nestjs/platform-express';
import { Request } from 'express';
import { writeFileSync } from 'fs';
import { sanitizeStr } from 'src/helpers';

@Controller('images')
export class ImagesController {
  constructor(private configService: ConfigService) { }

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  uploadImage(
    @Req() req: Request,
    @UploadedFile(new ParseFilePipeBuilder()
      .addFileTypeValidator({ fileType: /^image/ })
      .addMaxSizeValidator({ maxSize: 5000000 }) // 5Mb
      .build({
        errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY
      }))
    file: Express.Multer.File
  ) {
    const uploadsFolder = this.configService.get<string>('UPLOADS_FOLDER');
    const filename = sanitizeStr(file.originalname);
    writeFileSync(`${uploadsFolder}/${filename}`, file.buffer);

    const url = `${req.protocol}://${req.get('Host')}`;
    const imageUrl = `${url}/images/${filename}`;
    return { url: imageUrl };
  }
}
