import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';

//TODO: to remove if not used
@Injectable()
export class ParseArrayPipe implements PipeTransform {
  transform(value: any) {
    if (!value) {
      return [];
    }
    if (typeof value === 'string') {
      return value.split(',');
    }
    if (Array.isArray(value)) {
      return value;
    }
    throw new BadRequestException('Invalid array format');
  }
}
