import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common'
import { CarsService } from './cars.service'
import { CreateCarDto } from './dto/create-car.dto'
import { UpdateCarDto } from './dto/update-car.dto'

@Controller('cars')
export class CarsController {
  constructor(private readonly carsService: CarsService) {}

  @Get()
  cars() {
    return this.carsService.cars()
  }

  @Get(':id')
  car(@Param('id') id: string) {
    return this.carsService.car(+id)
  }

  @Post()
  createCar(@Body() createCarDto: CreateCarDto) {
    return this.carsService.createCar(createCarDto)
  }

  @Patch(':id')
  updateCar(@Param('id') id: string, @Body() updateCarDto: UpdateCarDto) {
    return this.carsService.updateCar(+id, updateCarDto)
  }

  @Delete(':id')
  deleteCar(@Param('id') id: string) {
    return this.carsService.deleteCar(+id)
  }
}
