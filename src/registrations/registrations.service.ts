import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class RegistrationsService {
  constructor(private prisma: PrismaService) {}
  createRegistry(data: Prisma.RegistrationsCreateInput) {
    return this.prisma.registrations.create({ data });
  }

  findAll() {
    return this.prisma.registrations.findMany();
  }

  findBy(params: { where: Prisma.RegistrationsWhereUniqueInput }) {
    return this.prisma.registrations.findUnique(params);
  }

  update(id: number, data: Prisma.RegistrationsUpdateInput) {
    return this.prisma.registrations.update({ where: { id }, data });
  }

  remove(id: number) {
    return this.prisma.registrations.delete({ where: { id } });
  }
}
