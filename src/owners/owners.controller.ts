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
import { Owner } from '@prisma/client'
import { FilterQueryDto } from 'src/common/dto/filter-query.dto'
import { ResponsesInterceptor } from 'src/common/interceptors/responses.interceptor'
import { ParseObjectIdPipe } from 'src/common/pipes/parse-object-id.pipe'
import { OwnersService } from './owners.service'
import { CreateOwnerDto } from './dto/create-owner.dto'
import { UpdateOwnerDto } from './dto/update-owner.dto'

@Controller('owners')
@UseInterceptors(ResponsesInterceptor)
export class OwnersController {
  constructor(private readonly ownersService: OwnersService) {}

  @Get()
  getAllOwners(@Query() filterQueryDto: FilterQueryDto): Promise<Owner[]> {
    return this.ownersService.getAllOwners(filterQueryDto)
  }

  @Get(':id')
  getOneOwner(@Param('id', ParseObjectIdPipe) id: string): Promise<Owner> {
    return this.ownersService.getOneOwner(id)
  }

  @Post()
  createOwner(@Body() createOwnerDto: CreateOwnerDto): Promise<Owner> {
    return this.ownersService.createOwner(createOwnerDto)
  }

  @Patch(':id')
  updateOwner(
    @Param('id', ParseObjectIdPipe) id: string,
    @Body() updateOwnerDto: UpdateOwnerDto,
  ): Promise<Owner> {
    return this.ownersService.updateOwner(id, updateOwnerDto)
  }

  @Delete(':id')
  deleteOwner(@Param('id', ParseObjectIdPipe) id: string): Promise<Owner> {
    return this.ownersService.deleteOwner(id)
  }
}
