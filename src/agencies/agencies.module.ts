import { Module } from '@nestjs/common'
import { AgenciesService } from './agencies.service'
import { AgenciesController } from './agencies.controller'
import { PrismaService } from 'src/database/prisma.service'

@Module({
  controllers: [AgenciesController],
  providers: [PrismaService, AgenciesService],
})
export class AgenciesModule {}
