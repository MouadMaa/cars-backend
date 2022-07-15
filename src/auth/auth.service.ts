import { Injectable } from '@nestjs/common'
import { OwnersService } from 'src/owners/owners.service'

@Injectable()
export class AuthService {
  constructor(private ownersService: OwnersService) {}

  async validateOwner(email: string, pass: string): Promise<any> {
    const owner = await this.ownersService.getOneOwnerByEmail(email)
    if (owner && owner.password === pass) {
      return owner
    }
    return null
  }
}
