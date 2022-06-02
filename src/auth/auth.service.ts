import { Injectable } from '@nestjs/common';
import { AdminsService } from 'src/admins/admins.service';
import { BcryptService } from 'src/helpers/bcrypt';
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class AuthService {
  constructor(
    private adminsService: AdminsService,
    private bcrypt: BcryptService,
    private jwtService: JwtService,
  ) {}

  async validateAdmin(email: string, password: string): Promise<any> {
    const admin = await this.adminsService.findBy({ where: { email } });
    if (admin && this.bcrypt.decrypt(password, admin.password)) {
      const { password, ...result } = admin;
      return result;
    }

    return null;
  }

  async login(admin: any) {
    const payload = { email: admin.email, sub: admin.id };
    return {
      token: this.jwtService.sign(payload),
    };
  }
}
