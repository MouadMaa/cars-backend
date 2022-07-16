import { Injectable } from '@nestjs/common'
import { Owner } from '@prisma/client'
import { PrismaService } from 'src/database/prisma.service'
import {
  getAll,
  getOne,
  createOne,
  deleteOne,
  updateOne,
} from 'src/common/api/handler-factory.api'
import { CreateOwnerDto } from './dto/create-owner.dto'
import { UpdateOwnerDto } from './dto/update-owner.dto'

@Injectable()
export class OwnersService {
  constructor(private db: PrismaService) {}

  getOwners(filterQueryDto: any): Promise<Owner[]> {
    return getAll(this.db.owner, filterQueryDto)
  }

  getOwner(id: string): Promise<Owner> {
    return getOne(this.db.owner, { id })
  }

  getOwnerByEmail(email: string): Promise<Owner> {
    return this.db.owner.findUnique({ where: { email } })
  }

  createOwner(createOwnerDto: CreateOwnerDto): Promise<Owner> {
    return createOne(this.db.owner, createOwnerDto)
  }

  updateOwner(id: string, updateOwnerDto: UpdateOwnerDto): Promise<Owner> {
    return updateOne(this.db.owner, { id }, updateOwnerDto)
  }

  deleteOwner(id: string): Promise<Owner> {
    return deleteOne(this.db.owner, { id })
  }
}
