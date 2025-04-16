import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import {
  ArrayNotEmpty,
  IsArray,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';
import mongoose from 'mongoose';

import { Language } from '../../enums/language.enum';

export class UpdateUserDto {
  @ApiProperty({
    example: 'new_username',
    required: false,
  })
  @IsString()
  @IsOptional()
  @MinLength(5, {
    message: 'Username Must Be At Least 5 Caracters Long',
  })
  username: string;

  @ApiProperty({
    example: 'new.email@example.com',
    required: false,
  })
  @IsString()
  @IsOptional()
  email: string;

  @ApiProperty({
    example: 'NewP@ssw0rd',
    required: false,
  })
  @IsString()
  @IsOptional()
  password: string;

  @ApiProperty({
    example: 987654321,
    required: false,
  })
  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  phone: number;

  @ApiProperty({
    example: 'Updated First Name',
    required: false,
  })
  @IsString()
  @IsOptional()
  firstName: string;

  @ApiProperty({
    example: 'Updated Last Name',
    required: false,
  })
  @IsString()
  @IsOptional()
  lastName: string;

  @ApiProperty({
    enum: Language,
    example: Language.EN,
    required: false,
  })
  @IsEnum(Language)
  @IsOptional()
  language: Language;

  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  @IsOptional()
  roles: string[];
}
