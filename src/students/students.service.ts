import { Injectable, Request, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Prisma } from '@prisma/client';
import { BcryptService } from 'src/helpers/bcrypt';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class StudentsService {
  constructor(
    private prisma: PrismaService,
    private bcrypt: BcryptService,
    private jwtService: JwtService,
  ) {}

  async create(data: Prisma.StudentsCreateInput) {
    data.password = await this.bcrypt.encrypt(data.password);
    return await this.prisma.students.create({ data });
  }

  all() {
    return this.prisma.students.findMany();
  }

  async findBy(
    params: { where: Prisma.StudentsWhereUniqueInput },
    @Request() req = null,
  ) {
    if (!(await this._checkUser(req, params.where.id))) {
      return null;
    }

    return this.prisma.students.findUnique(params);
  }

  async update(
    id: number,
    data: Prisma.StudentsUpdateInput,
    @Request() req = null,
  ) {
    if (!(await this._checkUser(req, id))) {
      return null;
    }
    return await this.prisma.students.update({ where: { id }, data });
  }

  async remove(id: number) {
    return this.prisma.students.delete({ where: { id } });
  }

  async _checkUser(@Request() req, id) {
    if (req === null) {
      return true;
    }

    const token = req.headers.authorization.split(' ')[1];
    const user = await this._tryGetUserFromTokenStudent(token);
    if (user === null && this._tryGetUserFromTokenAdmin(token)) {
      return true;
    }

    if (user.id !== id) {
      return false;
    }

    return true;
  }

  async _tryGetUserFromTokenStudent(token) {
    try {
      return await this.jwtService.verifyAsync(token, {
        secret: process.env.STUDENT_SECRET_KEY,
      });
    } catch (e) {
      return null;
    }
  }

  async _tryGetUserFromTokenAdmin(token) {
    try {
      await this.jwtService.verifyAsync(token, {
        secret: process.env.ADMIN_SECRET_KEY,
      });
    } catch (e) {
      return e;
    }

    return true;
  }
}
