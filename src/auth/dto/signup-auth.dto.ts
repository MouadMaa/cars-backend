import { IsEmail, IsPhoneNumber, IsString, MinLength } from 'class-validator'

export class SignupAuthDto {
  @IsString()
  name: string

  @IsPhoneNumber()
  phone: string

  @IsEmail()
  email: string

  @IsString()
  @MinLength(8)
  password: string
}
