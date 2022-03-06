import { IsEmail, IsString, Length, MaxLength, MinLength } from "class-validator";

export class CreateUserDto {
  @IsString({ message: 'Invalid format'})
  @MaxLength(30, {message: 'Max length 30 symbol'})
  @MinLength(2, {message: 'Min length 2 symbol'})
  name: string
  @IsEmail({}, {message: 'field must be email'})
  email: string
  @Length(8, 20, {message: 'Pass should be between 8 and 20 symbol'})
  @IsString()
  password: string
}
