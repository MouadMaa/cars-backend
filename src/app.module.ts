import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { CarsModule } from './cars/cars.module'
import { OwnersModule } from './owners/owners.module'

@Module({
  imports: [ConfigModule.forRoot(), CarsModule, OwnersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
