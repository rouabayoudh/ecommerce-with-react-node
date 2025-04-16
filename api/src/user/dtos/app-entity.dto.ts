import { IsNotEmpty, IsString } from 'class-validator';

export class AppEntityDto {
  @IsNotEmpty()
  @IsString()
  name: string;
}
