import { Module } from '@nestjs/common';
import { AdminsModule } from './admins/admins.module';
import { StudentsModule } from './students/students.module';
import { TeachersModule } from './teachers/teachers.module';
import { CoursesModule } from './courses/courses.module';
import { ClassesModule } from './classes/classes.module';
import { RegistrationsModule } from './registrations/registrations.module';
import { AuthModule } from './auth/auth.module';
import { RouterModule } from '@nestjs/core';

@Module({
  imports: [
    AdminsModule,
    StudentsModule,
    TeachersModule,
    CoursesModule,
    ClassesModule,
    RegistrationsModule,
    AuthModule,
    // RouterModule.register([
    //   {
    //     path: 'admins',
    //     module: AdminsModule,
    //     children: [
    //       {
    //         path: 'teachers',
    //         module: TeachersModule,
    //       },
    //       {
    //         path: 'students',
    //         module: StudentsModule,
    //       },
    //       {
    //         path: 'courses'
    //       },
    //     ],
    //   },
    // ]),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
