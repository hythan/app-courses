import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CoursesService {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.CoursesCreateInput) {
    return await this.prisma.courses.create({ data });
  }

  async findAll() {
    return await this.prisma.courses.findMany();
  }

  async findBy(params: { where: Prisma.CoursesWhereUniqueInput }) {
    const { where } = params;
    return await this.prisma.courses.findUnique({ where });
  }

  async update(id: number, data: Prisma.CoursesUpdateInput) {
    return await this.prisma.courses.update({ where: { id }, data });
  }

  async remove(id: number) {
    await this.prisma.courses.delete({ where: { id } });
    return 'Successfuly removed!';
  }
}
