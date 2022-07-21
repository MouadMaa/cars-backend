import { BadRequestException, Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Agency } from '@prisma/client'
import { hash, verify } from 'argon2'
import { AgenciesService } from 'src/agencies/agencies.service'
import { SignupAuthDto } from './dto/signup-auth.dto'
import { UpdateAuthDto } from './dto/update-auth.dto'

@Injectable()
export class AuthService {
  constructor(
    private agenciesService: AgenciesService,
    private jwtService: JwtService,
  ) {}

  async signup(createAuthDto: SignupAuthDto): Promise<any> {
    createAuthDto.password = await hash(createAuthDto.password)
    createAuthDto.email = createAuthDto.email.toLowerCase()
    const user = await this.agenciesService.createAgency(createAuthDto)
    return this.login(user)
  }

  async login(user: any): Promise<any> {
    const payload = { sub: user.id, email: user.email }
    return {
      access_token: this.jwtService.sign(payload),
    }
  }

  async validateUser(email: string, password: string): Promise<Agency | null> {
    const user = await this.agenciesService.getAgencyByEmail(email)
    if (!user) return null

    const validPassword = await verify(user.password, password)
    if (!validPassword) return null
    return user
  }

  async getAgencyProfile(userReq: any): Promise<Agency> {
    const agency = await this.agenciesService.getAgency(userReq.userId)
    return { ...agency, password: undefined }
  }

  async updateAgencyProfile(
    userReq: any,
    updateAuthDto: UpdateAuthDto,
  ): Promise<Agency> {
    if (updateAuthDto.password) {
      if (!updateAuthDto.newPassword) {
        throw new BadRequestException('Field new password is missing')
      }
      if (!(await this.validateUser(userReq.email, updateAuthDto.password))) {
        throw new BadRequestException('Your current password is wrong')
      }
      updateAuthDto.password = await hash(updateAuthDto.newPassword)
      updateAuthDto.newPassword = undefined
    }

    const agency = await this.agenciesService.updateAgency(
      userReq.userId,
      updateAuthDto,
    )
    return { ...agency, password: undefined }
  }
}
