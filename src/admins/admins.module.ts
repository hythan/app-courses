import { Module } from '@nestjs/common';
import { AdminsService } from './admins.service';
import { AdminsController } from './admins.controller';
import { HelpersModule } from 'src/helpers/helpers.module';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [HelpersModule, PrismaModule],
  controllers: [AdminsController],
  providers: [AdminsService],
  exports: [AdminsService],
})
export class AdminsModule {}
