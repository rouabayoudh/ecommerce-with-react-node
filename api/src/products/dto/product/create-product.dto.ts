import { ApiProperty } from '@nestjs/swagger';
import {
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
  MinLength,
} from 'class-validator';

export class CreateProductDto {
  @ApiProperty({
    example: 'Product Name',
    minLength: 3,
  })
  @MinLength(3, {
    message: 'Category name must be at least 3 characters long',
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    example: 'A brief description of the product',
    required: false,
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    example: 49.99,
  })
  @IsNotEmpty()
  @IsNumber({}, { message: 'Price must be a number' })
  @Min(0)
  price: number;

  @ApiProperty({
    example: '60b6c5b5c9b9f8c13b8e8b5e',
  })
  @IsMongoId({
    message: 'Category ID must be a valid MongoDB ObjectId',
  })
  @IsNotEmpty()
  category: string;
}
