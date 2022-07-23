import {
  IsDateString,
  IsEmail,
  IsEnum,
  IsOptional,
  IsPhoneNumber,
  IsPositive,
  IsString,
} from 'class-validator'

enum OrderStatus {
  Opened = 'Opened',
  Accepted = 'Accepted',
  Refused = 'Refused',
}

export class CreateOrderDto {
  @IsString()
  name: string

  @IsPhoneNumber()
  phone: string

  @IsEmail()
  email: string

  @IsOptional()
  @IsEnum(OrderStatus)
  status?: OrderStatus

  @IsDateString()
  startDate: Date

  @IsDateString()
  endDate: Date

  @IsOptional()
  @IsPositive()
  duration: number

  @IsString()
  vehicleId: string
}
