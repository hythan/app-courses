import { Module } from '@nestjs/common';
import { StudentsService } from './students.service';
import { StudentsController } from './students.controller';
import { PrismaService } from 'src/prisma.service';
import { BcryptService } from 'src/helpers/bcrypt';

@Module({
  controllers: [StudentsController],
  providers: [StudentsService, PrismaService, BcryptService],
})
export class StudentsModule {}
