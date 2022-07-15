import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common'
import { Owner } from '@prisma/client'
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard'
import { LocalAuthGuard } from 'src/common/guards/local-auth.guard'
import { ResponsesInterceptor } from 'src/common/interceptors/responses.interceptor'
import { AuthService } from './auth.service'
import { CreateAuthDto } from './dto/create-auth.dto'

@Controller('auth')
@UseInterceptors(ResponsesInterceptor)
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  async signup(@Body() createAuthDto: CreateAuthDto) {
    return this.authService.signup(createAuthDto)
  }

  @Post('login')
  @UseGuards(LocalAuthGuard)
  async login(@Request() req: any) {
    return this.authService.login(req.user)
  }

  @Get('profile')
  @UseGuards(JwtAuthGuard)
  async getProfile(@Request() req: any): Promise<Owner> {
    return this.authService.getOwnerProfile(req.user)
  }
}
