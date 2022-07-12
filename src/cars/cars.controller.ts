import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common'
import { Car, Prisma } from '@prisma/client'
import { CarsService } from './cars.service'

@Controller('cars')
export class CarsController {
  constructor(private readonly carsService: CarsService) {}

  @Get()
  cars() {
    return this.carsService.cars()
  }

  @Get(':id')
  car(@Param('id') id: string) {
    return this.carsService.car({ id })
  }

  @Post()
  createCar(@Body() data: Prisma.CarCreateInput): Promise<Car> {
    return this.carsService.createCar(data)
  }

  @Patch(':id')
  updateCar(@Param('id') id: string, @Body() data: Prisma.CarUpdateInput) {
    return this.carsService.updateCar({ id }, data)
  }

  @Delete(':id')
  deleteCar(@Param('id') id: string) {
    return this.carsService.deleteCar({ id })
  }
}
