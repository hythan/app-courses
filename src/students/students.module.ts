import { Module } from '@nestjs/common';
import { StudentsService } from './students.service';
import { StudentsController } from './students.controller';
import { PrismaService } from 'src/prisma.service';
import { BcryptService } from 'src/helpers/bcrypt';
import { JwtService } from '@nestjs/jwt';

@Module({
  controllers: [StudentsController],
  providers: [StudentsService, PrismaService, BcryptService, JwtService],
  exports: [StudentsService],
})
export class StudentsModule {}
