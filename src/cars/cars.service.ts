import { Injectable } from '@nestjs/common'
import { Car, Prisma } from '@prisma/client'
import { PrismaService } from 'src/prisma.service'

@Injectable()
export class CarsService {
  constructor(private db: PrismaService) {}

  cars(queryFilter: any): Promise<Car[]> {
    const { take, skip, orderBy, searchBy } = queryFilter

    const filter: any = {}

    if (take) filter.take = +take
    if (skip) filter.skip = +skip

    const sort = orderBy?.split(',')
    filter.orderBy = sort ? { [sort[0]]: sort[1] } : {} // { createdAt: 'desc' }

    if (searchBy) {
      const searchArray = searchBy.split('-')
      filter.where = searchArray.length
        ? {
            OR: searchArray.map((search) => {
              const str = search.split(',')
              return { [str[0]]: { contains: str[1] } }
            }),
          }
        : {}
    }

    return this.db.car.findMany(filter)
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
