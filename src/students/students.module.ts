import { Module } from '@nestjs/common';
import { StudentsService } from './students.service';
import { StudentsController } from './students.controller';
import { PrismaService } from 'src/prisma.service';
import { Bcrypt } from 'src/helpers/bcrypt';

@Module({
  controllers: [StudentsController],
  providers: [StudentsService, PrismaService, Bcrypt],
})
export class StudentsModule {}
