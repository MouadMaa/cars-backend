import { Module } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { CarsService } from './cars.service'
import { CarsController } from './cars.controller'

@Module({
  controllers: [CarsController],
  providers: [PrismaService, CarsService],
})
export class CarsModule {}
