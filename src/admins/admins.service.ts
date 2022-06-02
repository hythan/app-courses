import { Injectable } from '@nestjs/common';
import { Admins, Prisma } from '@prisma/client';
import { BcryptService } from 'src/helpers/bcrypt';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class AdminsService {
  constructor(private prisma: PrismaService, private bcrypt: BcryptService) {}

  async create(data: Prisma.AdminsCreateInput): Promise<Admins | null> {
    data.password = await this.bcrypt.encrypt(data.password);
    return await this.prisma.admins.create({ data });
  }

  all() {
    return this.prisma.admins.findMany();
  }

  async findBy(params: { where: Prisma.AdminsWhereUniqueInput }) {
    const { where } = params;
    return this.prisma.admins.findUnique({ where });
  }

  async update(id: number, data: Prisma.AdminsUpdateInput) {
    return await this.prisma.admins.update({ where: { id }, data });
  }

  async remove(id: number) {
    return this.prisma.admins.delete({ where: { id } });
  }
}
