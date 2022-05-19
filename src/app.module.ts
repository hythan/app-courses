import { Module } from '@nestjs/common';
import { AdminsModule } from './admins/admins.module';
import { StudentsModule } from './students/students.module';

@Module({
  imports: [AdminsModule, StudentsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
