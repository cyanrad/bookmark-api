import { IsNotEmpty, IsNumber, IsString, IsUrl } from 'class-validator';

export class createBookmarkDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  description: string;

  @IsUrl()
  @IsString()
  @IsNotEmpty()
  link: string;
}
