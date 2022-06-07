import { Injectable, Request } from '@nestjs/common';
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

  async getProfile(@Request() req) {
    const id = await this._getUserId(req);
    return this.prisma.students.findUnique({ where: { id } });
  }

  async updateProfile(@Request() req, data: Prisma.StudentsUpdateInput) {
    const id = await this._getUserId(req);
    if (data.password) {
      data.password = await this.bcrypt.encrypt(data.password);
    }
    return await this.prisma.students.update({ where: { id }, data });
  }

  async create(data: Prisma.StudentsCreateInput) {
    data.password = await this.bcrypt.encrypt(data.password);
    return await this.prisma.students.create({ data });
  }

  all() {
    return this.prisma.students.findMany();
  }

  async findBy(params: { where: Prisma.StudentsWhereUniqueInput }) {
    return this.prisma.students.findUnique(params);
  }

  async update(id: number, data: Prisma.StudentsUpdateInput) {
    if (data.password) {
      data.password = await this.bcrypt.encrypt(data.password);
    }
    return await this.prisma.students.update({ where: { id }, data });
  }

  async remove(id: number) {
    return this.prisma.students.delete({ where: { id } });
  }

  async _getUserId(@Request() req) {
    const token = req.headers.authorization.split(' ')[1];
    const user = await this._getUserFromTokenStudent(token);
    return user.id;
  }

  async _getUserFromTokenStudent(token) {
    try {
      return await this.jwtService.verifyAsync(token, {
        secret: process.env.STUDENT_SECRET_KEY,
      });
    } catch (e) {
      throw new Error(e.message);
    }
  }
}
