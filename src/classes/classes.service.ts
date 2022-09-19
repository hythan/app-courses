import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma.service';

@Injectable()
export class ClassesService {
  constructor(private prisma: PrismaService) {}

  create(data: Prisma.ClassesCreateInput) {
    return this.prisma.classes.create({ data });
  }

  async findAll() {
    return await this.prisma.classes.findMany({
      include: {
        course: true,
      },
    });
  }

  async findBy(params: { where: Prisma.ClassesWhereUniqueInput }) {
    return await this.prisma.classes.findUnique(params);
  }

  update(id: number, data: Prisma.ClassesUpdateInput) {
    return this.prisma.classes.update({ where: { id }, data });
  }

  remove(id: number) {
    return this.prisma.classes.delete({ where: { id } });
  }
}
