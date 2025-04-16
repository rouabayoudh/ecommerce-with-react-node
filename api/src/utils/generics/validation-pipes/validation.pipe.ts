import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import mongoose from 'mongoose';

@Injectable()
export class MongoIdValidationPipe implements PipeTransform<any> {
  transform(value: string) {
    if (!this.isValidObjectId(value)) {
      throw new BadRequestException('Invalid MongoDB ObjectId');
    }
    return value;
  }

  private isValidObjectId(value: string): boolean {
    return mongoose.Types.ObjectId.isValid(value);
  }
}
