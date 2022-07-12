import { Injectable } from '@nestjs/common'
import { Car, Prisma } from '@prisma/client'
import { PrismaService } from 'src/prisma.service'
import { UpdateCarDto } from './dto/update-car.dto'

@Injectable()
export class CarsService {
  constructor(private db: PrismaService) {}

  cars(): Promise<Car[]> {
    return this.db.car.findMany()
  }

  car(carWhereUniqueInput: Prisma.CarWhereUniqueInput): Promise<Car> {
    return this.db.car.findUnique({ where: carWhereUniqueInput })
  }

  createCar(data: Prisma.CarCreateInput): Promise<Car> {
    return this.db.car.create({ data })
  }

  updateCar(id: number, updateCarDto: UpdateCarDto) {
    return `This action updates a #${id} car`
  }

  deleteCar(id: number) {
    return `This action removes a #${id} car`
  }
}
