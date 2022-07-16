import { IsEnum, IsOptional, IsPositive, IsString } from 'class-validator'

enum FuelType {
  Diesel = 'Diesel',
  Gasoline = 'Gasoline',
}

export class CreateCarDto {
  @IsString()
  name: string

  @IsString()
  model: string

  @IsString()
  brand: string

  @IsPositive()
  price: number

  @IsOptional()
  @IsString()
  desc?: string

  @IsEnum(FuelType)
  fuelType: FuelType

  @IsOptional()
  @IsString()
  color?: string

  @IsOptional()
  @IsString({ each: true })
  imagesUrl: string[]

  @IsString()
  agencyId: string
}
