import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class ClassesService {
  constructor(private prisma: PrismaService) {}

  create(data: Prisma.ClassCreateInput) {
    return this.prisma.class.create({ data });
  }

  findAll() {
    return this.prisma.class.findMany();
  }

  findBy(params: { where: Prisma.ClassWhereUniqueInput }) {
    return this.prisma.class.findUnique(params);
  }

  update(id: number, data: Prisma.ClassUpdateInput) {
    return this.prisma.class.update({ where: { id }, data });
  }

  remove(id: number) {
    return this.prisma.class.delete({ where: { id } });
  }
}
