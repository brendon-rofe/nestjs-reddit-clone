import { IsEmail, IsNotEmpty, IsString, isString } from "class-validator";

export class RegisterUserDto {

  @IsEmail()
  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  password: string;

};