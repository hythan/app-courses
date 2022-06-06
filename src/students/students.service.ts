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

  async findBy(params: { where: Prisma.StudentsWhereUniqueInput }) {
    return this.prisma.students.findUnique(params);
  }

  async update(id: number, data: Prisma.StudentsUpdateInput) {
    return await this.prisma.students.update({ where: { id }, data });
  }

  async remove(id: number) {
    return this.prisma.students.delete({ where: { id } });
  }
}
