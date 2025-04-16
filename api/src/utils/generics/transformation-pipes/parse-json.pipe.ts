import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';

//TODO: to remove if not used
@Injectable()
export class ParseJSONPipe implements PipeTransform {
  transform(value: string) {
    try {
      return JSON.parse(value);
    } catch (error) {
      throw new BadRequestException('Invalid JSON string');
    }
  }
}
