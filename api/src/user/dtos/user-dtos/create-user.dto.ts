import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsEmail,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    example: 'username',
    minLength: 5,
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(5, {
    message: 'Username Must Be At Least 5 Caracters Long',
  })
  username: string;

  @ApiProperty({
    example: 'user@example.com',
  })
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'StrongP@ssw0rd',
    minLength: 6,
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(6, {
    message: 'Password Must Be At Least 6 Caracters Long',
  })
  //TODO: @IsStrongPassword()
  password: string;

  @ApiProperty({
    example: 123456789,
    required: false,
  })
  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  phone?: number;

  @ApiProperty({
    example: 'First',
  })
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @ApiProperty({
    example: 'Last',
  })
  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsOptional()
  @IsArray()
  @IsMongoId({ each: true })
  roles: string[];
}
