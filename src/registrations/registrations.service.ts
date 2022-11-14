import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class RegistrationsService {
  constructor(private prisma: PrismaService) {}
  async createRegistry(data: Prisma.RegistrationsCreateInput) {
    const exists = await this.prisma.registrations.count({
      where: {
        studentId: data.student.connect.id,
        AND: {
          classId: data.class.connect.id,
        },
      },
    });

    if (exists > 0) {
      return { status: 304, statusText: 'The record already exists' };
    }
    return this.prisma.registrations.create({ data });
  }

  findAll() {
    return this.prisma.registrations.findMany();
  }

  findBy(params: { where: Prisma.RegistrationsWhereUniqueInput }) {
    try {
      const { where } = params;
      return this.prisma.registrations.findUnique({
        where,
        include: {
          student: true,
          class: { include: { teacher: { select: { name: true } } } },
        },
      });
    } catch (error) {
      return error.message;
    }
  }

  update(id: number, data: Prisma.RegistrationsUpdateInput) {
    return this.prisma.registrations.update({ where: { id }, data });
  }

  async updateMany(ids: Array<number>) {
    return await this.prisma.registrations.updateMany({
      where: { id: { in: ids } },
      data: {
        complete: true,
      },
    });
  }

  remove(id: number) {
    return this.prisma.registrations.delete({ where: { id } });
  }
}
