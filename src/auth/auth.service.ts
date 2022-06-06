import { Injectable } from '@nestjs/common';
import { AdminsService } from 'src/admins/admins.service';
import { BcryptService } from 'src/helpers/bcrypt';
import { JwtService } from '@nestjs/jwt';
import { StudentsService } from 'src/students/students.service';

@Injectable()
export class AuthService {
  constructor(
    private adminsService: AdminsService,
    private studentsService: StudentsService,
    private bcrypt: BcryptService,
    private jwtService: JwtService,
  ) {}

  async validateAdmin(email: string, password: string): Promise<any> {
    const admin = await this.adminsService.findBy({ where: { email } });
    if (admin && (await this.bcrypt.decrypt(password, admin.password))) {
      const { password, ...result } = admin;
      return result;
    }
  }

  async validadeStudent(email: string, password: string): Promise<any> {
    const student = await this.studentsService.findBy({ where: { email } });

    if (student && (await this.bcrypt.decrypt(password, student.password))) {
      const { password, ...result } = student;
      return result;
    }
  }

  async loginAdmin(user: any) {
    const payload = { email: user.email, id: user.id };
    return {
      token: this.jwtService.sign(payload, {
        secret: process.env.ADMIN_SECRET_KEY,
        expiresIn: '4800s',
      }),
    };
  }

  async loginStudent(user: any) {
    const payload = { email: user.email, id: user.id };
    return {
      token: this.jwtService.sign(payload, {
        secret: process.env.STUDENT_SECRET_KEY,
        expiresIn: '3600s',
      }),
    };
  }
}
