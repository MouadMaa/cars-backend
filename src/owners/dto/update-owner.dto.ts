import { PartialType } from '@nestjs/mapped-types'
import { IsBoolean } from 'class-validator'
import { CreateOwnerDto } from './create-owner.dto'

export class UpdateOwnerDto extends PartialType(CreateOwnerDto) {
  @IsBoolean()
  status: boolean
}
