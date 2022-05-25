import { Module } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CoursesController } from './courses.controller';
import { Bcrypt } from 'src/helpers/bcrypt';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [CoursesController],
  providers: [CoursesService, Bcrypt, PrismaService],
})
export class CoursesModule {}
