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
import { Agency } from '@prisma/client'
import { FilterQueryDto } from 'src/common/dto/filter-query.dto'
import { ResponsesInterceptor } from 'src/common/interceptors/responses.interceptor'
import { ParseObjectIdPipe } from 'src/common/pipes/parse-object-id.pipe'
import { AgenciesService } from './agencies.service'
import { CreateAgencyDto } from './dto/create-agency.dto'
import { UpdateAgencyDto } from './dto/update-agency.dto'

@Controller('agencies')
@UseInterceptors(ResponsesInterceptor)
export class AgenciesController {
  constructor(private readonly agenciesService: AgenciesService) {}

  @Get()
  getAgencies(@Query() filterQueryDto: FilterQueryDto): Promise<Agency[]> {
    return this.agenciesService.getAgencies(filterQueryDto)
  }

  @Get(':id')
  getAgency(@Param('id', ParseObjectIdPipe) id: string): Promise<Agency> {
    return this.agenciesService.getAgency(id)
  }

  @Post()
  createAgency(@Body() createAgencyDto: CreateAgencyDto): Promise<Agency> {
    return this.agenciesService.createAgency(createAgencyDto)
  }

  @Patch(':id')
  updateAgency(
    @Param('id', ParseObjectIdPipe) id: string,
    @Body() updateAgencyDto: UpdateAgencyDto,
  ): Promise<Agency> {
    return this.agenciesService.updateAgency(id, updateAgencyDto)
  }

  @Delete(':id')
  deleteAgency(@Param('id', ParseObjectIdPipe) id: string): Promise<Agency> {
    return this.agenciesService.deleteAgency(id)
  }
}
