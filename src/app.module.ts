import { Module } from '@nestjs/common';
import { AdminsModule } from './admins/admins.module';
import { StudentsModule } from './students/students.module';
import { TeachersModule } from './teachers/teachers.module';

@Module({
  imports: [AdminsModule, StudentsModule, TeachersModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
