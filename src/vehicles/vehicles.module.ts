import { Module } from '@nestjs/common'
import { PrismaService } from 'src/database/prisma.service'
import { VehiclesService } from './vehicles.service'
import { VehiclesController } from './vehicles.controller'

@Module({
  controllers: [VehiclesController],
  providers: [PrismaService, VehiclesService],
})
export class VehiclesModule {}
