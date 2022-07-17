import { OmitType } from '@nestjs/mapped-types'
import { IsOptional, IsPositive, IsString } from 'class-validator'
import { CreateVehicleDto } from './create-vehicle.dto'

export class UpdateVehicleDto extends OmitType(CreateVehicleDto, [
  'agencyId',
] as const) {
  @IsOptional()
  @IsString()
  name: string

  @IsOptional()
  @IsString()
  model: string

  @IsOptional()
  @IsString()
  brand: string

  @IsOptional()
  @IsPositive()
  price: number
}
