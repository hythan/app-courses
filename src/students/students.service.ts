import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { Bcrypt } from 'src/helpers/bcrypt';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class StudentsService {
  constructor(private prisma: PrismaService, private bcrypt: Bcrypt) {}

  async create(data: Prisma.StudentCreateInput) {
    data.password = await this.bcrypt.encrypt(data.password);
    return await this.prisma.student.create({ data });
  }

  all() {
    return this.prisma.student.findMany();
  }

  async findBy(params: { where: Prisma.StudentWhereUniqueInput }) {
    return this.prisma.student.findUnique(params);
  }

  async update(id: number, data: Prisma.StudentUpdateInput) {
    return await this.prisma.student.update({ where: { id }, data });
  }

  async remove(id: number) {
    return this.prisma.student.delete({ where: { id } });
  }
}
