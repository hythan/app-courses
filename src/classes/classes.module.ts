import { Module } from '@nestjs/common';
import { ClassesService } from './classes.service';
import { ClassesController } from './classes.controller';
import { PrismaService } from 'src/prisma.service';
import { BcryptService } from 'src/helpers/bcrypt';

@Module({
  controllers: [ClassesController],
  providers: [ClassesService, BcryptService, PrismaService],
})
export class ClassesModule {}
