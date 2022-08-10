import { Module } from '@nestjs/common';
import { ClassesService } from './classes.service';
import { ClassesController } from './classes.controller';
import { PrismaService } from '../prisma.service';

@Module({
  imports: [PrismaService],
  controllers: [ClassesController],
  providers: [ClassesService],
})
export class ClassesModule {}
