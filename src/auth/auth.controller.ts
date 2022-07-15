import {
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common'
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard'
import { LocalAuthGuard } from 'src/common/guards/local-auth.guard'
import { ResponsesInterceptor } from 'src/common/interceptors/responses.interceptor'
import { AuthService } from './auth.service'

@Controller('auth')
@UseInterceptors(ResponsesInterceptor)
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @UseGuards(LocalAuthGuard)
  async login(@Request() req) {
    return this.authService.login(req.user)
  }

  @Get('profile')
  @UseGuards(JwtAuthGuard)
  getProfile(@Request() req) {
    return req.user
  }
}
