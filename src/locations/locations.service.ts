import { Injectable } from '@nestjs/common'
import { Location } from '@prisma/client'
import { PrismaService } from 'src/database/prisma.service'
import {
  getAll,
  getOne,
  createOne,
  deleteOne,
  updateOne,
} from 'src/common/api/handler-factory.api'
import { CreateLocationDto } from './dto/create-location.dto'
import { UpdateLocationDto } from './dto/update-location.dto'

@Injectable()
export class LocationsService {
  constructor(private db: PrismaService) {}

  locations(filterQueryDto: any): Promise<Location[]> {
    return getAll(this.db.location, filterQueryDto)
  }

  location(id: string): Promise<Location> {
    return getOne(this.db.location, { id })
  }

  createLocation(createLocationDto: CreateLocationDto): Promise<Location> {
    return createOne(this.db.location, createLocationDto)
  }

  updateLocation(
    id: string,
    updateLocationDto: UpdateLocationDto,
  ): Promise<Location> {
    return updateOne(this.db.location, { id }, updateLocationDto)
  }

  deleteLocation(id: string): Promise<Location> {
    return deleteOne(this.db.location, { id })
  }
}
