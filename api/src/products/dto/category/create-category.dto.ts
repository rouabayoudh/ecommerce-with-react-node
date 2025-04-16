import { ApiProperty } from '@nestjs/swagger';
import {
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateCategoryDto {
  @ApiProperty({
    example: 'category1',
    minLength: 3,
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(3, {
    message: 'Category name must be at least 3 characters long',
  })
  name: string;

  @ApiProperty({
    example: 'This is a description for category1',
    required: false,
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({
    example: '60b6c5b5c9b9f8c13b8e8b5e',
    required: false,
  })
  @IsMongoId({
    message: 'Parent Category ID must be a valid MongoDB ObjectId',
  })
  @IsOptional()
  parentCategory?: string;
}
