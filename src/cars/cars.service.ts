import { Injectable } from '@nestjs/common'
import { Car } from '@prisma/client'
import { PrismaService } from 'src/database/prisma.service'
import {
  getAll,
  getOne,
  createOne,
  deleteOne,
  updateOne,
} from 'src/common/api/handler-factory.api'
import { CreateCarDto } from './dto/create-car.dto'
import { UpdateCarDto } from './dto/update-car.dto'

@Injectable()
export class CarsService {
  constructor(private db: PrismaService) {}

  getCars(filterQueryDto: any): Promise<Car[]> {
    return getAll(this.db.car, filterQueryDto)
  }

  getCar(id: string): Promise<Car> {
    return getOne(this.db.car, { id })
  }

  createCar(createCarDto: CreateCarDto): Promise<Car> {
    return createOne(this.db.car, createCarDto)
  }

  updateCar(id: string, updateCarDto: UpdateCarDto): Promise<Car> {
    return updateOne(this.db.car, { id }, updateCarDto)
  }

  deleteCar(id: string): Promise<Car> {
    return deleteOne(this.db.car, { id })
  }
}
