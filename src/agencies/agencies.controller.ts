import {
  Controller,
  Get,
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

  @Delete(':id')
  deleteAgency(@Param('id', ParseObjectIdPipe) id: string): Promise<Agency> {
    return this.agenciesService.deleteAgency(id)
  }
}
