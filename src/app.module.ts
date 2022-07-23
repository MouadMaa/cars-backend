import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { VehiclesModule } from './vehicles/vehicles.module'
import { AgenciesModule } from './agencies/agencies.module'
import { AuthModule } from './auth/auth.module'
import { OrdersModule } from './orders/orders.module'

@Module({
  imports: [
    ConfigModule.forRoot(),
    AgenciesModule,
    AuthModule,
    VehiclesModule,
    OrdersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
