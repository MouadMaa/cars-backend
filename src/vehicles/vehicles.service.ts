import { Injectable } from '@nestjs/common'
import { Vehicle } from '@prisma/client'
import { PrismaService } from 'src/database/prisma.service'
import {
  getAll,
  getOne,
  createOne,
  deleteOne,
  updateOne,
} from 'src/common/api/handler-factory.api'
import { CreateVehicleDto } from './dto/create-vehicle.dto'
import { UpdateVehicleDto } from './dto/update-vehicle.dto'

@Injectable()
export class VehiclesService {
  constructor(private db: PrismaService) {}

  getVehicles(filterQueryDto: any): Promise<Vehicle[]> {
    return getAll(this.db.vehicle, filterQueryDto)
  }

  getVehicle(id: string): Promise<Vehicle> {
    return getOne(this.db.vehicle, { id })
  }

  createVehicle(createVehicleDto: CreateVehicleDto): Promise<Vehicle> {
    return createOne(this.db.vehicle, createVehicleDto)
  }

  updateVehicle(
    id: string,
    updateVehicleDto: UpdateVehicleDto,
  ): Promise<Vehicle> {
    return updateOne(this.db.vehicle, { id }, updateVehicleDto)
  }

  deleteVehicle(id: string): Promise<Vehicle> {
    return deleteOne(this.db.vehicle, { id })
  }
}
