import { Module } from '@nestjs/common';
import { TeachersService } from './teachers.service';
import { TeachersController } from './teachers.controller';
import { PrismaService } from 'src/prisma.service';
import { Bcrypt } from 'src/helpers/bcrypt';

@Module({
  controllers: [TeachersController],
  providers: [TeachersService, PrismaService, Bcrypt],
})
export class TeachersModule {}
