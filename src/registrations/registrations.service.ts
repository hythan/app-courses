import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class RegistrationsService {
  constructor(private prisma: PrismaService) {}
  async createRegistry(data: Prisma.RegistrationsUncheckedCreateInput) {
    const exists = await this.prisma.registrations.count({
      where: {
        studentId: +data.studentId,
        AND: {
          classId: +data.classId,
        },
      },
    });

    if (exists > 0) {
      return { status: 304, statusText: 'The record already exists' };
    }
    return await this.prisma.registrations.create({ data });
  }

  async findAll() {
    return await this.prisma.registrations.findMany();
  }

  async findBy(params: { where: Prisma.RegistrationsWhereUniqueInput }) {
    try {
      const { where } = params;
      return await this.prisma.registrations.findUnique({
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

  async update(id: number, data: Prisma.RegistrationsUpdateInput) {
    return await this.prisma.registrations.update({ where: { id }, data });
  }

  async updateMany(ids: Array<number>) {
    return await this.prisma.registrations.updateMany({
      where: { id: { in: ids } },
      data: {
        complete: true,
      },
    });
  }

  async remove(id: number) {
    await this.prisma.registrations.delete({ where: { id } });
    return 'Successfuly removed!';
  }
}
