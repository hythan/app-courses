import { Injectable } from '@nestjs/common';
import { Admins, Prisma } from '@prisma/client';
import { BcryptService } from '../helpers/bcrypt.service';
import { ErrorsService } from '../helpers/errors.service';
import { PrismaService } from '../prisma.service';

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

  async all() {
    try {
      return await this.prisma.admins.findMany();
    } catch (e: any) {
      return e;
    }
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

  async validadeAdminUser(email: string, password: string) {
    const admin = await this.findBy({ where: { email } });
    if (admin && (await this.bcrypt.decrypt(password, admin.password))) {
      const { password, ...result } = admin;
      return result;
    }

    return null;
  }
}
