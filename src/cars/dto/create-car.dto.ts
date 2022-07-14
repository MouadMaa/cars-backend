import { IsNumber, IsOptional, IsString } from 'class-validator'

export class CreateCarDto {
  @IsString()
  name: string

  @IsString()
  model: string

  @IsString()
  brand: string

  @IsNumber()
  price: number

  @IsOptional()
  @IsString()
  desc?: string

  @IsOptional()
  @IsString()
  color?: string

  @IsOptional()
  @IsString({ each: true })
  imagesUrl: string[]
}
