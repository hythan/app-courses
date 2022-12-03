import { Module } from '@nestjs/common';
import { StudentsService } from './students.service';
import { StudentsController } from './students.controller';
import { JwtService } from '@nestjs/jwt';
import { HelpersModule } from 'src/helpers/helpers.module';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [HelpersModule, PrismaModule],
  controllers: [StudentsController],
  providers: [StudentsService, JwtService],
  exports: [StudentsService],
})
export class StudentsModule {}
