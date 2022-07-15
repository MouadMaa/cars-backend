import { IsOptional, IsString } from 'class-validator'

export class CreateLocationDto {
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
