import { Injectable } from '@nestjs/common'
import { Car } from '@prisma/client'
import { PrismaService } from 'src/prisma.service'
import { CreateCarDto } from './dto/create-car.dto'
import { UpdateCarDto } from './dto/update-car.dto'

@Injectable()
export class CarsService {
  constructor(private db: PrismaService) {}

  cars(): Promise<Car[]> {
    return this.db.car.findMany()
  }

  car(id: number) {
    return `This action returns a #${id} car`
  }

  createCar(createCarDto: CreateCarDto) {
    return 'This action adds a new car'
  }

  updateCar(id: number, updateCarDto: UpdateCarDto) {
    return `This action updates a #${id} car`
  }

  deleteCar(id: number) {
    return `This action removes a #${id} car`
  }
}
