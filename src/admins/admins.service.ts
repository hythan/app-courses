import { Injectable } from '@nestjs/common';
import { Admin, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class AdminsService {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.AdminCreateInput): Promise<Admin | null> {
    return await this.prisma.admin.create({ data });
  }

  all() {
    return this.prisma.admin.findMany();
  }

  async findBy(params: { where: Prisma.AdminWhereUniqueInput }) {
    const { where } = params;
    return this.prisma.admin.findUnique({ where });
  }

  async update(id: number, data: Prisma.AdminCreateInput) {
    return await this.prisma.admin.update({ where: { id }, data });
  }

  async remove(id: number) {
    return this.prisma.admin.delete({ where: { id } });
  }
}
