import {
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags } from '@nestjs/swagger';
import { Express } from 'express';

import { MongoIdValidationPipe } from '@/utils/generics/validation-pipes/validation.pipe';

import { AttachmentService } from './attachment.service';

@Controller('attachments')
@ApiTags('attachments')
export class AttachmentController {
  constructor(private attachmentService: AttachmentService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file')) // This handles single file upload
  upload(
    @UploadedFile() file: Express.Multer.File,
    @Query('uploadFolder') uploadFolder: string,
  ) {
    return this.attachmentService.upload(file);
  }

  @Get()
  getAllAttachments() {
    return this.attachmentService.findAll();
  }

  @Get(':id')
  getAttachmentByid(
    @Param('id', new MongoIdValidationPipe()) attachmentId: string,
  ) {
    return this.attachmentService.findOne(attachmentId);
  }

  @Delete(':id')
  deleteAttachmentById(
    @Param('id', new MongoIdValidationPipe()) attachmentId: string,
  ) {
    return this.attachmentService.deleteOne(attachmentId);
  }
}
