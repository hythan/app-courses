import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma.service';

@Injectable()
export class ClassesService {
  constructor(private prisma: PrismaService) {}

  create(data: Prisma.ClassesCreateInput) {
    return this.prisma.classes.create({ data });
  }

  async findAll(where?: any) {
    if (where.courseId) {
      where.courseId = +where.courseId;
    }

    return await this.prisma.classes.findMany({
      where: where,
      include: {
        course: { select: { name: true } },
        registrations: true,
      },
    });
  }

  async findBy(where: Prisma.ClassesWhereUniqueInput) {
    return await this.prisma.classes.findUnique({
      where,
      include: {
        registrations: {
          include: { class: { include: { teacher: true } }, student: true },
        },
      },
    });
  }

  update(id: number, data: Prisma.ClassesUpdateInput) {
    delete data.registrations;

    return this.prisma.classes.update({ where: { id }, data });
  }

  remove(id: number) {
    return this.prisma.classes.delete({ where: { id } });
  }
}
