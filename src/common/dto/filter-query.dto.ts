import { IsNumberString, IsOptional, IsString } from 'class-validator'

export class FilterQueryDto {
  @IsOptional()
  @IsNumberString()
  take?: number

  @IsOptional()
  @IsNumberString()
  skip?: number

  @IsOptional()
  @IsString()
  orderBy?: string

  @IsOptional()
  @IsString()
  searchBy?: string
}
