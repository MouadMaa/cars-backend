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
import { FilterQueryDto } from 'src/common/dto/filter-query.dto'
import { ParseObjectIdPipe } from 'src/common/pipes/parse-object-id.pipe'
import { CarsService } from './cars.service'
import { CreateCarDto } from './dto/create-car.dto'
import { UpdateCarDto } from './dto/update-car.dto'

@Controller('cars')
export class CarsController {
  constructor(private readonly carsService: CarsService) {}

  @Get()
  cars(@Query() filterQueryDto: FilterQueryDto): Promise<Car[]> {
    return this.carsService.cars(filterQueryDto)
  }

  @Get(':id')
  car(@Param('id', ParseObjectIdPipe) id: string): Promise<Car> {
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
  ): Promise<Car> {
    return this.carsService.updateCar(id, updateCarDto)
  }

  @Delete(':id')
  deleteCar(@Param('id', ParseObjectIdPipe) id: string): Promise<Car> {
    return this.carsService.deleteCar(id)
  }
}
