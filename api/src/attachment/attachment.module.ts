import { promises as fs } from 'fs';
import { resolve } from 'path';

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

import { config } from '@/config';
import sanitize from '@/utils/sanitize-file-name';

import { AttachmentController } from './attachment.controller';
import { AttachmentService } from './attachment.service';
import { Attachment, AttachmentSchema } from './attachment.shema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Attachment.name,
        schema: AttachmentSchema,
      },
    ]),
    MulterModule.register({
      limits: {
        fileSize: config.attachment.maxFileSize,
      },
      storage: diskStorage({
        destination: async (req, file, cb) => {
          const uploadPath =
            typeof req.query.uploadPath === 'string'
              ? req.query.uploadPath
              : 'user';
          const resolvedPath = resolve(__dirname, '../../uploads', uploadPath);

          try {
            // Ensure the directory exists
            await fs.mkdir(resolvedPath, { recursive: true });
            cb(null, resolvedPath);
          } catch (error) {
            cb(new Error('Failed to create directory'), null);
          }
        },

        filename: (req, file, cb) => {
          cb(
            null,
            `${sanitize(file.originalname).slice(0, config.attachment.maxFileNameLength)}-${Date.now()}-${Math.round(Math.random() * 1e9)}`,
          );
        },
      }),
    }),
  ],
  controllers: [AttachmentController],
  providers: [AttachmentService],
  exports: [AttachmentService],
})
export class AttachmentModule {}
