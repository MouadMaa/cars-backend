import { PartialType } from '@nestjs/mapped-types'
import { IsOptional, IsString, MinLength } from 'class-validator'
import { SignupAuthDto } from './signup-auth.dto'

export class UpdateAuthDto extends PartialType(SignupAuthDto) {
  @IsOptional()
  @IsString()
  @MinLength(8)
  newPassword: string
}
