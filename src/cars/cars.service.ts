import { Injectable } from '@nestjs/common'
import { Car, Prisma } from '@prisma/client'
import { PrismaService } from 'src/prisma.service'
import {
  getAll,
  getOne,
  createOne,
  deleteOne,
  updateOne,
} from 'src/common/api/handler-api'

@Injectable()
export class CarsService {
  constructor(private db: PrismaService) {}

  cars(queryFilter: any): Promise<Car[]> {
    return getAll(this.db.car, queryFilter)
  }

  car(where: Prisma.CarWhereUniqueInput): Promise<Car> {
    return getOne(this.db.car, where)
  }

  createCar(data: Prisma.CarCreateInput): Promise<Car> {
    return createOne(this.db.car, data)
  }

  updateCar(
    where: Prisma.CarWhereUniqueInput,
    data: Prisma.CarUpdateInput,
  ): Promise<Car> {
    return updateOne(this.db.car, where, data)
  }

  deleteCar(where: Prisma.CarWhereUniqueInput): Promise<Car> {
    return deleteOne(this.db.car, where)
  }
}
