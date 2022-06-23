import { Injectable } from '@nestjs/common';
import { Admins, Prisma } from '@prisma/client';
import { BcryptService } from 'src/helpers/bcrypt';
import { ErrorsService } from 'src/helpers/errors.service';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class AdminsService {
  constructor(
    private prisma: PrismaService,
    private bcrypt: BcryptService,
    private errorsService: ErrorsService,
  ) {}

  async create(data: Prisma.AdminsCreateInput): Promise<Admins | null> {
    try {
      data.password = await this.bcrypt.encrypt(data.password);
      return await this.prisma.admins.create({ data });
    } catch (e: any) {
      return this.errorsService.getErrorMessage(e);
    }
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
