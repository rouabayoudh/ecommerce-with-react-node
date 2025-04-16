import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Express } from 'express';
import { Model } from 'mongoose';

import { BaseService } from '@/utils/generics/base.service';

import { Attachment } from './attachment.shema';
import { CreateAttachmentDto } from './dtos/create-attachment.dto';

@Injectable()
export class AttachmentService extends BaseService<Attachment> {
  constructor(
    @InjectModel(Attachment.name) private attachmentModel: Model<Attachment>,
  ) {
    super(attachmentModel, Attachment);
  }

  async upload(file: Express.Multer.File) {
    const createAttachmentDto: CreateAttachmentDto = {
      name: file.filename,
      path: file.path,
      type: file.mimetype,
      size: file.size,
    };
    const newAttachment = new this.attachmentModel(createAttachmentDto);
    try {
      return await newAttachment.save();
    } catch (e) {
      if (e.code === 11000) {
        // Handle unique constraint violation
        throw new ConflictException('Name Already Exists');
      } else if (e.name === 'ValidationError') {
        // Handle missing attributes or other validation errors
        const messages = Object.values(e.errors).map((err: any) => err.message);
        throw new BadRequestException(messages.join(', '));
      } else {
        // Handle other types of errors
        throw new BadRequestException(
          'An error occurred while creating the attachment',
        );
      }
    }
  }

  //TODO :when DELETE remove from folder
}
