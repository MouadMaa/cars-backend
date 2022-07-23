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
import { Order } from '@prisma/client'
import { FilterQueryDto } from 'src/common/dto/filter-query.dto'
import { ResponsesInterceptor } from 'src/common/interceptors/responses.interceptor'
import { ParseObjectIdPipe } from 'src/common/pipes/parse-object-id.pipe'
import { OrdersService } from './orders.service'
import { CreateOrderDto } from './dto/create-order.dto'
import { UpdateOrderDto } from './dto/update-order.dto'

@Controller('orders')
@UseInterceptors(ResponsesInterceptor)
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get()
  getOrders(@Query() filterQueryDto: FilterQueryDto): Promise<Order[]> {
    return this.ordersService.getOrders(filterQueryDto)
  }

  @Get(':id')
  getOrder(@Param('id', ParseObjectIdPipe) id: string): Promise<Order> {
    return this.ordersService.getOrder(id)
  }

  @Post()
  createOrder(@Body() createOrderDto: CreateOrderDto): Promise<Order> {
    return this.ordersService.createOrder(createOrderDto)
  }

  @Patch(':id')
  updateOrder(
    @Param('id', ParseObjectIdPipe) id: string,
    @Body() updateOrderDto: UpdateOrderDto,
  ): Promise<Order> {
    return this.ordersService.updateOrder(id, updateOrderDto)
  }

  @Delete(':id')
  deleteOrder(@Param('id', ParseObjectIdPipe) id: string): Promise<Order> {
    return this.ordersService.deleteOrder(id)
  }
}
