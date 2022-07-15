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
import { Location } from '@prisma/client'
import { FilterQueryDto } from 'src/common/dto/filter-query.dto'
import { ResponsesInterceptor } from 'src/common/interceptors/responses.interceptor'
import { ParseObjectIdPipe } from 'src/common/pipes/parse-object-id.pipe'
import { LocationsService } from './locations.service'
import { CreateLocationDto } from './dto/create-location.dto'
import { UpdateLocationDto } from './dto/update-location.dto'

@Controller('locations')
@UseInterceptors(ResponsesInterceptor)
export class LocationsController {
  constructor(private readonly locationsService: LocationsService) {}

  @Get()
  locations(@Query() filterQueryDto: FilterQueryDto): Promise<Location[]> {
    return this.locationsService.locations(filterQueryDto)
  }

  @Get(':id')
  location(@Param('id', ParseObjectIdPipe) id: string): Promise<Location> {
    return this.locationsService.location(id)
  }

  @Post()
  createLocation(
    @Body() createLocationDto: CreateLocationDto,
  ): Promise<Location> {
    return this.locationsService.createLocation(createLocationDto)
  }

  @Patch(':id')
  updateLocation(
    @Param('id', ParseObjectIdPipe) id: string,
    @Body() updateLocationDto: UpdateLocationDto,
  ): Promise<Location> {
    return this.locationsService.updateLocation(id, updateLocationDto)
  }

  @Delete(':id')
  deleteLocation(
    @Param('id', ParseObjectIdPipe) id: string,
  ): Promise<Location> {
    return this.locationsService.deleteLocation(id)
  }
}
