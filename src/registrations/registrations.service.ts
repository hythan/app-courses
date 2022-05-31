import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class RegistrationsService {
  constructor(private prisma: PrismaService) {}
  createRegistry(data: Prisma.RegistrationCreateInput) {
    return this.prisma.registration.create({ data });
  }

  findAll() {
    return this.prisma.registration.findMany();
  }

  findBy(params: { where: Prisma.RegistrationWhereUniqueInput }) {
    return this.prisma.registration.findUnique(params);
  }

  update(id: number, data: Prisma.RegistrationUpdateInput) {
    return this.prisma.registration.update({ where: { id }, data });
  }

  remove(id: number) {
    return this.prisma.registration.delete({ where: { id } });
  }
}
