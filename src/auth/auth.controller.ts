import {
  Body,
  Controller,
  Get,
  Patch,
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
import { LoginAuthDto } from './dto/login-auth.dto'
import { SignupAuthDto } from './dto/signup-auth.dto'
import { UpdateAuthDto } from './dto/update-auth.dto'

@Controller('auth')
@UseInterceptors(ResponsesInterceptor)
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  async signup(@Body() signupAuthDto: SignupAuthDto) {
    return this.authService.signup(signupAuthDto)
  }

  @Post('login')
  @UseGuards(LocalAuthGuard)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async login(@Request() req: any, @Body() _loginAuthDto: LoginAuthDto) {
    return this.authService.login(req.user)
  }

  @Get('profile')
  @UseGuards(JwtAuthGuard)
  async getProfile(@Request() req: any): Promise<Owner> {
    return this.authService.getOwnerProfile(req.user)
  }

  @Patch('profile')
  @UseGuards(JwtAuthGuard)
  async updateProfile(
    @Request() req: any,
    @Body() updateAuthDto: UpdateAuthDto,
  ): Promise<Owner> {
    return this.authService.updateOwnerProfile(req.user, updateAuthDto)
  }
}
