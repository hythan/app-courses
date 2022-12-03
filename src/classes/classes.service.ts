import { ForbiddenException, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ClassesService {
  constructor(private prisma: PrismaService) {}

  create(data: Prisma.ClassesUncheckedCreateInput) {
    return this.prisma.classes.create({ data }).catch((error) => {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code == 'P2003'
      ) {
        throw new ForbiddenException(
          'Foreign key constraint failed on the field:' + error.meta.field_name,
        );
      }
      throw error;
    });
  }

  async findAll(where?: any) {
    if (where && where.courseId) {
      where.courseId = +where.courseId;
    }

    return await this.prisma.classes.findMany({
      where: where,
      include: {
        course: { select: { name: true } },
        teacher: { select: { name: true } },
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

  async update(id: number, data: Prisma.ClassesUpdateInput) {
    delete data.registrations;

    return await this.prisma.classes.update({ where: { id }, data });
  }

  async remove(id: number) {
    await this.prisma.classes.delete({ where: { id } });
    return 'Successfuly removed!';
  }
}
