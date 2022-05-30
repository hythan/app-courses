import { Module } from '@nestjs/common';
import { AdminsModule } from './admins/admins.module';
import { StudentsModule } from './students/students.module';
import { TeachersModule } from './teachers/teachers.module';
import { CoursesModule } from './courses/courses.module';
import { ClassesModule } from './classes/classes.module';

@Module({
  imports: [AdminsModule, StudentsModule, TeachersModule, CoursesModule, ClassesModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
