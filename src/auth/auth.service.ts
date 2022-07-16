import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Owner } from '@prisma/client'
import { hash, verify } from 'argon2'
import { OwnersService } from 'src/owners/owners.service'
import { SignupAuthDto } from './dto/signup-auth.dto'

@Injectable()
export class AuthService {
  constructor(
    private ownersService: OwnersService,
    private jwtService: JwtService,
  ) {}

  async signup(createAuthDto: SignupAuthDto): Promise<any> {
    createAuthDto.password = await hash(createAuthDto.password)
    const owner = await this.ownersService.createOwner(createAuthDto)
    return this.login(owner)
  }

  async login(user: any): Promise<any> {
    const payload = { sub: user.id, email: user.email }
    return {
      access_token: this.jwtService.sign(payload),
    }
  }

  async getOwnerProfile(user: any): Promise<Owner> {
    const owner = await this.ownersService.getOneOwner(user.userId)
    return { ...owner, password: undefined }
  }

  async validateOwner(email: string, password: string): Promise<any> {
    const owner = await this.ownersService.getOneOwnerByEmail(email)
    if (!owner) return null

    const validPassword = await verify(owner.password, password)
    if (!validPassword) return null

    return owner
  }
}
