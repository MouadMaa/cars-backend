import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { OwnersService } from 'src/owners/owners.service'

@Injectable()
export class AuthService {
  constructor(
    private ownersService: OwnersService,
    private jwtService: JwtService,
  ) {}

  async validateOwner(email: string, pass: string): Promise<any> {
    const owner = await this.ownersService.getOneOwnerByEmail(email)
    if (owner && owner.password === pass) {
      return owner
    }
    return null
  }

  async login(owner: any) {
    const payload = { email: owner.email, sub: owner.id }
    return {
      access_token: this.jwtService.sign(payload),
    }
  }
}
