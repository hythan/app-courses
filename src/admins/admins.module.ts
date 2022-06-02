import { Module } from '@nestjs/common';
import { AdminsService } from './admins.service';
import { AdminsController } from './admins.controller';
import { PrismaService } from 'src/prisma.service';
import { BcryptService } from 'src/helpers/bcrypt';

@Module({
  controllers: [AdminsController],
  providers: [AdminsService, PrismaService, BcryptService],
  exports: [AdminsService],
})
export class AdminsModule {}
