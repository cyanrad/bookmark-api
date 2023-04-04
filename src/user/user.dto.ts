import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class editMeDTO {
  @IsEmail()
  email: string;

  @IsString()
  firstName: string;

  @IsString()
  lastName: string;
}
