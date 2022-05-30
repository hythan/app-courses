import { Module } from '@nestjs/common';
import { ClassesService } from './classes.service';
import { ClassesController } from './classes.controller';
import { PrismaService } from 'src/prisma.service';
import { Bcrypt } from 'src/helpers/bcrypt';

@Module({
  controllers: [ClassesController],
  providers: [ClassesService, Bcrypt, PrismaService],
})
export class ClassesModule {}
