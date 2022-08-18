import { Module } from '@nestjs/common';
import { StudentsService } from './students.service';
import { StudentsController } from './students.controller';
import { PrismaService } from 'src/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { HelpersModule } from 'src/helpers/helpers.module';

@Module({
  imports: [HelpersModule],
  controllers: [StudentsController],
  providers: [StudentsService, JwtService, PrismaService],
  exports: [StudentsService],
})
export class StudentsModule {}
