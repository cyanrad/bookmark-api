import { IsEmail, IsNotEmpty, IsString } from "class-validator"

export class signupUser {
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsNotEmpty()
    @IsString()
    password: string;

    @IsString()
    firstName: string;

    @IsString()
    lastName: string;
}