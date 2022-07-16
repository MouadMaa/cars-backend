import { OmitType } from '@nestjs/mapped-types'
import { IsOptional, IsString } from 'class-validator'
import { CreateAgencyDto } from './create-agency.dto'

export class UpdateAgencyDto extends OmitType(CreateAgencyDto, [
  'ownerId',
] as const) {
  @IsOptional()
  @IsString()
  name: string

  @IsOptional()
  @IsString()
  address: string
}
