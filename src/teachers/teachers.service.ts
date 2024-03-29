import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TeachersService {
  constructor(private prisma: PrismaService) {}

  create(data: Prisma.TeachersCreateInput) {
    return this.prisma.teachers.create({ data });
  }

  findAll() {
    return this.prisma.teachers.findMany();
  }

  findBy(params: { where: Prisma.TeachersWhereUniqueInput }) {
    return this.prisma.teachers.findUnique(params);
  }

  update(id: number, data: Prisma.TeachersUpdateInput) {
    return this.prisma.teachers.update({ where: { id }, data });
  }

  async remove(id: number) {
    await this.prisma.teachers.delete({ where: { id } });
    return 'Successfuly removed!';
  }
}
