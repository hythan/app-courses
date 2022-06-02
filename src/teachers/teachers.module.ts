import { Module } from '@nestjs/common';
import { TeachersService } from './teachers.service';
import { TeachersController } from './teachers.controller';
import { PrismaService } from 'src/prisma.service';
import { BcryptService } from 'src/helpers/bcrypt';

@Module({
  controllers: [TeachersController],
  providers: [TeachersService, PrismaService, BcryptService],
})
export class TeachersModule {}
