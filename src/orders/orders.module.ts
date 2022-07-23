import { Module } from '@nestjs/common'
import { PrismaService } from 'src/database/prisma.service'
import { OrdersService } from './orders.service'
import { OrdersController } from './orders.controller'

@Module({
  controllers: [OrdersController],
  providers: [PrismaService, OrdersService],
})
export class OrdersModule {}
