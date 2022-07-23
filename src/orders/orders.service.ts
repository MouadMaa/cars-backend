import { Injectable } from '@nestjs/common'
import { Order } from '@prisma/client'
import { PrismaService } from 'src/database/prisma.service'
import {
  getAll,
  getOne,
  createOne,
  deleteOne,
  updateOne,
} from 'src/common/api/handler-factory.api'
import { CreateOrderDto } from './dto/create-order.dto'
import { UpdateOrderDto } from './dto/update-order.dto'

@Injectable()
export class OrdersService {
  constructor(private db: PrismaService) {}

  getOrders(filterQueryDto: any): Promise<Order[]> {
    return getAll(this.db.order, filterQueryDto)
  }

  getOrder(id: string): Promise<Order> {
    return getOne(this.db.order, { id })
  }

  createOrder(createOrderDto: CreateOrderDto): Promise<Order> {
    createOrderDto.duration = this.getDurationInHours(createOrderDto)
    return createOne(this.db.order, createOrderDto)
  }

  updateOrder(id: string, updateOrderDto: UpdateOrderDto): Promise<Order> {
    if (updateOrderDto.startDate && updateOrderDto.endDate) {
      updateOrderDto.duration = this.getDurationInHours(updateOrderDto)
    }
    return updateOne(this.db.order, { id }, updateOrderDto)
  }

  deleteOrder(id: string): Promise<Order> {
    return deleteOne(this.db.order, { id })
  }

  getDurationInHours(orderDto: CreateOrderDto | UpdateOrderDto): number {
    const { startDate, endDate } = orderDto
    return (
      Math.abs(new Date(startDate).getTime() - new Date(endDate).getTime()) /
      36e5
    )
  }
}
