import { OmitType } from '@nestjs/mapped-types'
import {
  IsDateString,
  IsEmail,
  IsEnum,
  IsOptional,
  IsPhoneNumber,
  IsPositive,
  IsString,
} from 'class-validator'
import { CreateOrderDto } from './create-order.dto'

enum OrderStatus {
  Opened = 'Opened',
  Accepted = 'Accepted',
  Refused = 'Refused',
}

export class UpdateOrderDto extends OmitType(CreateOrderDto, [
  'vehicleId',
] as const) {
  @IsOptional()
  @IsString()
  name: string

  @IsOptional()
  @IsPhoneNumber()
  phone: string

  @IsOptional()
  @IsEmail()
  email: string

  @IsOptional()
  @IsEnum(OrderStatus)
  status: OrderStatus

  @IsOptional()
  @IsDateString()
  startDate: Date

  @IsOptional()
  @IsDateString()
  endDate: Date

  @IsOptional()
  @IsPositive()
  duration: number
}
