import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseInterceptors,
} from '@nestjs/common'
import { Vehicle } from '@prisma/client'
import { FilterQueryDto } from 'src/common/dto/filter-query.dto'
import { ResponsesInterceptor } from 'src/common/interceptors/responses.interceptor'
import { ParseObjectIdPipe } from 'src/common/pipes/parse-object-id.pipe'
import { VehiclesService } from './vehicles.service'
import { CreateVehicleDto } from './dto/create-vehicle.dto'
import { UpdateVehicleDto } from './dto/update-vehicle.dto'

@Controller('vehicles')
@UseInterceptors(ResponsesInterceptor)
export class VehiclesController {
  constructor(private readonly vehiclesService: VehiclesService) {}

  @Get()
  getVehicles(@Query() filterQueryDto: FilterQueryDto): Promise<Vehicle[]> {
    return this.vehiclesService.getVehicles(filterQueryDto)
  }

  @Get(':id')
  getVehicle(@Param('id', ParseObjectIdPipe) id: string): Promise<Vehicle> {
    return this.vehiclesService.getVehicle(id)
  }

  @Post()
  createVehicle(@Body() createVehicleDto: CreateVehicleDto): Promise<Vehicle> {
    return this.vehiclesService.createVehicle(createVehicleDto)
  }

  @Patch(':id')
  updateVehicle(
    @Param('id', ParseObjectIdPipe) id: string,
    @Body() updateVehicleDto: UpdateVehicleDto,
  ): Promise<Vehicle> {
    return this.vehiclesService.updateVehicle(id, updateVehicleDto)
  }

  @Delete(':id')
  deleteVehicle(@Param('id', ParseObjectIdPipe) id: string): Promise<Vehicle> {
    return this.vehiclesService.deleteVehicle(id)
  }
}
