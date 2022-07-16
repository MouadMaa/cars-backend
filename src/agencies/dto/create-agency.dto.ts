import { IsOptional, IsString } from 'class-validator'

export class CreateAgencyDto {
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
