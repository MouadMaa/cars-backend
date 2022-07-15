import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Owner } from '@prisma/client'
import { OwnersService } from 'src/owners/owners.service'
import { CreateAuthDto } from './dto/create-auth.dto'

@Injectable()
export class AuthService {
  constructor(
    private ownersService: OwnersService,
    private jwtService: JwtService,
  ) {}

  async signup(createAuthDto: CreateAuthDto): Promise<any> {
    const user = await this.ownersService.createOwner(createAuthDto)
    return this.login(user)
  }

  async login(user: any): Promise<any> {
    const payload = { sub: user.id, email: user.email }
    return {
      access_token: this.jwtService.sign(payload),
    }
  }

  async getOwnerProfile(user: any): Promise<Owner> {
    const owner = await this.ownersService.getOneOwner(user.userId)
    return { ...owner, password: undefined, status: undefined }
  }

  async validateOwner(email: string, pass: string): Promise<any> {
    const owner = await this.ownersService.getOneOwnerByEmail(email)
    if (owner && owner.password === pass) {
      return owner
    }
    return null
  }
}
