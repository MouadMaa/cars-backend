import { Module } from '@nestjs/common'
import { LocationsService } from './locations.service'
import { LocationsController } from './locations.controller'
import { PrismaService } from 'src/database/prisma.service'

@Module({
  controllers: [LocationsController],
  providers: [PrismaService, LocationsService],
})
export class LocationsModule {}
