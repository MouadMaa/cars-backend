import { Module } from '@nestjs/common'
import { OwnersService } from './owners.service'
import { OwnersController } from './owners.controller'
import { PrismaService } from 'src/database/prisma.service'

@Module({
  controllers: [OwnersController],
  providers: [PrismaService, OwnersService],
})
export class OwnersModule {}
