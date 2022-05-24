import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class TeachersService {
  constructor(private prisma: PrismaService) {}

  create(data: Prisma.TeacherCreateInput) {
    return this.prisma.teacher.create({ data });
  }

  findAll() {
    return this.prisma.teacher.findMany();
  }

  findBy(params: { where: Prisma.TeacherWhereUniqueInput }) {
    return this.prisma.teacher.findUnique(params);
  }

  update(id: number, data: Prisma.TeacherUpdateInput) {
    return this.prisma.teacher.update({ where: { id }, data });
  }

  remove(id: number) {
    return this.prisma.teacher.delete({ where: { id } });
  }
}
