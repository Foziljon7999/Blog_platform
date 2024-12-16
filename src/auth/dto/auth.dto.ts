import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

export class AuthDto {
    @IsNotEmpty()
    @IsString()
    username: string;

    @IsEmail()
    email: string;

    @IsNotEmpty()
    @MinLength(3)
    password: string;
}