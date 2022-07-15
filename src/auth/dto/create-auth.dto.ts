import { IsEmail, IsPhoneNumber, IsString, MinLength } from 'class-validator'

export class CreateAuthDto {
  @IsString()
  name: string

  @IsPhoneNumber()
  phone: string

  @IsEmail()
  email: string

  @IsString()
  @MinLength(8, {
    message: 'A password must have more or equal then 8 characters',
  })
  password: string
}
