import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common'
import { Car, Prisma } from '@prisma/client'
import { ParseObjectIdPipe } from 'src/common/pipes/parse-object-id.pipe'
import { CarsService } from './cars.service'
import { CreateCarDto } from './dto/create-car.dto'
import { UpdateCarDto } from './dto/update-car.dto'

@Controller('cars')
export class CarsController {
  constructor(private readonly carsService: CarsService) {}

  @Get()
  cars(@Query() queryFilter: Prisma.CarAggregateArgs) {
    return this.carsService.cars(queryFilter)
  }

  @Get(':id')
  car(@Param('id', ParseObjectIdPipe) id: string) {
    return this.carsService.car(id)
  }

  @Post()
  createCar(@Body() createCarDto: CreateCarDto): Promise<Car> {
    return this.carsService.createCar(createCarDto)
  }

  @Patch(':id')
  updateCar(
    @Param('id', ParseObjectIdPipe) id: string,
    @Body() updateCarDto: UpdateCarDto,
  ) {
    return this.carsService.updateCar(id, updateCarDto)
  }

  @Delete(':id')
  deleteCar(@Param('id', ParseObjectIdPipe) id: string) {
    return this.carsService.deleteCar(id)
  }
}
