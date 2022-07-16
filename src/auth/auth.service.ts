import { BadRequestException, Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Owner } from '@prisma/client'
import { hash, verify } from 'argon2'
import { OwnersService } from 'src/owners/owners.service'
import { SignupAuthDto } from './dto/signup-auth.dto'
import { UpdateAuthDto } from './dto/update-auth.dto'

@Injectable()
export class AuthService {
  constructor(
    private ownersService: OwnersService,
    private jwtService: JwtService,
  ) {}

  async signup(createAuthDto: SignupAuthDto): Promise<any> {
    createAuthDto.password = await hash(createAuthDto.password)
    createAuthDto.email = createAuthDto.email.toLowerCase()
    const owner = await this.ownersService.createOwner(createAuthDto)
    return this.login(owner)
  }

  async login(user: any): Promise<any> {
    const payload = { sub: user.id, email: user.email }
    return {
      access_token: this.jwtService.sign(payload),
    }
  }

  async validateOwner(email: string, password: string): Promise<any> {
    const owner = await this.ownersService.getOwnerByEmail(email)
    if (!owner) return null

    const validPassword = await verify(owner.password, password)
    if (!validPassword) return null
    return owner
  }

  async getOwnerProfile(user: any): Promise<Owner> {
    const owner = await this.ownersService.getOwner(user.userId)
    return { ...owner, password: undefined }
  }

  async updateOwnerProfile(
    user: any,
    updateAuthDto: UpdateAuthDto,
  ): Promise<Owner> {
    if (updateAuthDto.password) {
      if (!updateAuthDto.newPassword) {
        throw new BadRequestException('Field new password is missing')
      }
      if (!(await this.validateOwner(user.email, updateAuthDto.password))) {
        throw new BadRequestException('Your current password is wrong')
      }
      updateAuthDto.password = await hash(updateAuthDto.newPassword)
      updateAuthDto.newPassword = undefined
    }

    const owner = await this.ownersService.updateOwner(
      user.userId,
      updateAuthDto,
    )
    return { ...owner, password: undefined }
  }
}
