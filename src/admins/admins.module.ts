import { Module } from '@nestjs/common';
import { AdminsService } from './admins.service';
import { AdminsController } from './admins.controller';
import { PrismaService } from 'src/prisma.service';
import { HelpersModule } from 'src/helpers/helpers.module';

@Module({
  imports: [HelpersModule],
  controllers: [AdminsController],
  providers: [AdminsService, PrismaService],
  exports: [AdminsService],
})
export class AdminsModule {}
