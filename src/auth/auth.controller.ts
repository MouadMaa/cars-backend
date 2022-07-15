import {
  Controller,
  Post,
  Request,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common'
import { LocalAuthGuard } from 'src/common/guards/local-auth.guard'
import { ResponsesInterceptor } from 'src/common/interceptors/responses.interceptor'

@Controller('auth')
@UseInterceptors(ResponsesInterceptor)
export class AuthController {
  @Post('login')
  @UseGuards(LocalAuthGuard)
  async login(@Request() req) {
    return req.user
  }
}
