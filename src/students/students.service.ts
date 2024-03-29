import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { BcryptService } from 'src/helpers/bcrypt.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class StudentsService {
  constructor(private prisma: PrismaService, private bcrypt: BcryptService) {}

  async create(data: Prisma.StudentsCreateInput) {
    data.password = await this.bcrypt.encrypt(data.password);
    return await this.prisma.students.create({ data });
  }

  all(studentsIds?: any) {
    if (studentsIds) {
      studentsIds = studentsIds.map((e) => parseInt(e));
      return this.prisma.students.findMany({
        where: { id: { notIn: studentsIds } },
      });
    }
    return this.prisma.students.findMany();
  }

  async findBy(params: { where: Prisma.StudentsWhereUniqueInput }) {
    return this.prisma.students.findUnique(params);
  }

  async update(id: number, data: Prisma.StudentsUpdateInput) {
    if (data.password == '' || data.password == undefined) {
      delete data.password;
    }

    if (data.password) {
      data.password = await this.bcrypt.encrypt(data.password);
    }
    return await this.prisma.students.update({ where: { id }, data });
  }

  async remove(id: number) {
    await this.prisma.students.delete({ where: { id } });
    return 'Successfuly removed!';
  }

  async validadeStudentUser(email: string, password: string) {
    const student = await this.findBy({ where: { email } });
    if (student && (await this.bcrypt.decrypt(password, student.password))) {
      const { password, ...result } = student;
      return result;
    }

    return null;
  }
}
