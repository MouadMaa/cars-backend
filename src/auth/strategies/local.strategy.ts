import { Strategy } from 'passport-local'
import { PassportStrategy } from '@nestjs/passport'
import { BadRequestException, Injectable } from '@nestjs/common'
import { Owner } from '@prisma/client'
import { AuthService } from '../auth.service'

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({ usernameField: 'email' })
  }

  async validate(email: string, password: string): Promise<Owner> {
    const owner = await this.authService.validateOwner(email, password)
    if (!owner) {
      throw new BadRequestException('Email or password not valid')
    }
    return owner
  }
}
