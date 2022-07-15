import { Module } from '@nestjs/common'
import { PassportModule } from '@nestjs/passport'
import { AuthService } from './auth.service'
import { AuthController } from './auth.controller'
import { OwnersModule } from 'src/owners/owners.module'
import { LocalStrategy } from './strategies/local.strategy'

@Module({
  imports: [OwnersModule, PassportModule],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy],
})
export class AuthModule {}
