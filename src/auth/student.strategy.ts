import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from './auth.service';

@Injectable()
export class StudentStrategy extends PassportStrategy(Strategy, 'student') {
  constructor(private authService: AuthService) {
    super({ usernameField: 'email', passwordField: 'password' });
  }

  async validate(email: string, password: string): Promise<any> {
    const student = await this.authService.validadeStudent(email, password);
    if (!student) {
      throw new UnauthorizedException();
    }

    return student;
  }
}
