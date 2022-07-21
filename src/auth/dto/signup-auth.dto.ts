import {
  IsEmail,
  IsOptional,
  IsPhoneNumber,
  IsString,
  MinLength,
} from 'class-validator'

export class SignupAuthDto {
  @IsString()
  username: string

  @IsPhoneNumber()
  phone: string

  @IsEmail()
  email: string

  @IsString()
  @MinLength(8)
  password: string

  @IsString()
  name: string

  @IsString()
  address: string

  @IsOptional()
  @IsString()
  desc?: string

  @IsOptional()
  @IsString({ each: true })
  coordinates: string[]
}
