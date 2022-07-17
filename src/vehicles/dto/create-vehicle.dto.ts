import {
  IsEnum,
  IsObject,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator'

enum Type {
  Car = 'Car',
  Motorcycle = 'Motorcycle',
}

enum PriceBy {
  Month = 'Month',
  Week = 'Week',
  Day = 'Day',
  Hour = 'Hour',
}

export class CreateVehicleDto {
  @IsString()
  name: string

  @IsString()
  model: string

  @IsString()
  brand: string

  @IsOptional()
  @IsEnum(Type)
  Type?: Type

  @IsPositive()
  price: number

  @IsOptional()
  @IsEnum(PriceBy)
  priceBy?: PriceBy

  @IsOptional()
  @IsObject()
  details?: object

  @IsOptional()
  @IsString()
  desc?: string

  @IsOptional()
  @IsString({ each: true })
  imagesUrl: string[]

  @IsString()
  agencyId: string
}
