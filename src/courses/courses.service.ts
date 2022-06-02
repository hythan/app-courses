import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class CoursesService {
  constructor(private prisma: PrismaService) {}

  create(data: Prisma.CoursesCreateInput) {
    return this.prisma.courses.create({ data });
  }

  findAll() {
    return this.prisma.courses.findMany();
  }

  findBy(params: { where: Prisma.CoursesWhereUniqueInput }) {
    return this.prisma.courses.findUnique(params);
  }

  update(id: number, data: Prisma.CoursesUpdateInput) {
    return this.prisma.courses.update({ where: { id }, data });
  }

  remove(id: number) {
    return this.prisma.courses.delete({ where: { id } });
  }
}
