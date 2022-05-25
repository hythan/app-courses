import { Module } from '@nestjs/common';
import { AdminsModule } from './admins/admins.module';
import { StudentsModule } from './students/students.module';
import { TeachersModule } from './teachers/teachers.module';
import { CoursesModule } from './courses/courses.module';

@Module({
  imports: [AdminsModule, StudentsModule, TeachersModule, CoursesModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
