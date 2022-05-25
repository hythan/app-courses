import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';

@Injectable()
export class CoursesService {
  constructor(private prisma: PrismaService) {}

  create(data: Prisma.CourseCreateInput) {
    return this.prisma.course.create({ data });
  }

  findAll() {
    return this.prisma.course.findMany();
  }

  findBy(params: { where: Prisma.CourseWhereUniqueInput }) {
    return this.prisma.course.findUnique(params);
  }

  update(id: number, data: Prisma.CourseUpdateInput) {
    return this.prisma.course.update({ where: { id }, data });
  }

  remove(id: number) {
    return this.prisma.course.delete({ where: { id } });
  }
}
