import { Module } from '@nestjs/common';
import { AdminsService } from './admins.service';
import { AdminsController } from './admins.controller';
import { PrismaService } from 'src/prisma.service';
import { Bcrypt } from 'src/helpers/bcrypt';

@Module({
  controllers: [AdminsController],
  providers: [AdminsService, PrismaService, Bcrypt],
})
export class AdminsModule {}
