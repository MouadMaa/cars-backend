import { Injectable } from '@nestjs/common'
import { Agency } from '@prisma/client'
import { PrismaService } from 'src/database/prisma.service'
import {
  getAll,
  getOne,
  createOne,
  deleteOne,
  updateOne,
} from 'src/common/api/handler-factory.api'
import { CreateAgencyDto } from './dto/create-agency.dto'
import { UpdateAgencyDto } from './dto/update-agency.dto'

@Injectable()
export class AgenciesService {
  constructor(private db: PrismaService) {}

  getAgencies(filterQueryDto: any): Promise<Agency[]> {
    return getAll(this.db.agency, filterQueryDto)
  }

  getAgency(id: string): Promise<Agency> {
    return getOne(this.db.agency, { id }, ['vehicles'])
  }

  getAgencyByEmail(email: string): Promise<Agency> {
    return this.db.agency.findUnique({ where: { email } })
  }

  createAgency(createAgencyDto: CreateAgencyDto): Promise<Agency> {
    return createOne(this.db.agency, createAgencyDto)
  }

  updateAgency(id: string, updateAgencyDto: UpdateAgencyDto): Promise<Agency> {
    return updateOne(this.db.agency, { id }, updateAgencyDto)
  }

  deleteAgency(id: string): Promise<Agency> {
    return deleteOne(this.db.agency, { id })
  }
}
