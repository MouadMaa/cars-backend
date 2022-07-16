import { OmitType } from '@nestjs/mapped-types'
import { IsEnum, IsOptional, IsPositive, IsString } from 'class-validator'
import { CreateCarDto } from './create-car.dto'

enum FuelType {
  Diesel = 'Diesel',
  Gasoline = 'Gasoline',
}

export class UpdateCarDto extends OmitType(CreateCarDto, [
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

  @IsOptional()
  @IsEnum(FuelType)
  fuelType: FuelType
}
