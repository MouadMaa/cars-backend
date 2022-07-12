import { Injectable } from '@nestjs/common'
import { Car, Prisma } from '@prisma/client'
import { PrismaService } from 'src/prisma.service'

@Injectable()
export class CarsService {
  constructor(private db: PrismaService) {}

  cars(): Promise<Car[]> {
    return this.db.car.findMany()
  }

  car(where: Prisma.CarWhereUniqueInput): Promise<Car> {
    return this.db.car.findUnique({ where })
  }

  createCar(data: Prisma.CarCreateInput): Promise<Car> {
    return this.db.car.create({ data })
  }

  updateCar(
    where: Prisma.CarWhereUniqueInput,
    data: Prisma.CarUpdateInput,
  ): Promise<Car> {
    return this.db.car.update({ where, data })
  }

  deleteCar(where: Prisma.CarWhereUniqueInput): Promise<Car> {
    return this.db.car.delete({ where })
  }
}
