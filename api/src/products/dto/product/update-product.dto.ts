import { ApiProperty } from '@nestjs/swagger';
import {
  IsMongoId,
  IsNumber,
  IsOptional,
  IsString,
  Min,
  MinLength,
} from 'class-validator';

export class UpdateProductDto {
  @ApiProperty({
    example: 'Updated Product Name',
    required: false,
    minLength: 3,
  })
  @IsString()
  @IsOptional()
  @MinLength(3, {
    message: 'Product name must be at least 3 characters long',
  })
  name: string;

  @ApiProperty({
    example: 'Updated description for the product',
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
    message: 'Category ID must be a valid MongoDB ObjectId',
  })
  @IsOptional()
  category: string;

  @ApiProperty({
    example: 99.99,
    required: false,
  })
  @IsNumber({}, { message: 'Price must be a number' })
  @Min(0)
  @IsOptional()
  price: number;
}
