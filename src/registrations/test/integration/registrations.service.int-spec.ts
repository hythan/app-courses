import { Test } from '@nestjs/testing';
import { PrismaService } from 'src/prisma/prisma.service';
import { RegistrationsModule } from 'src/registrations/registrations.module';
import { RegistrationsService } from 'src/registrations/registrations.service';
import { StudentsModule } from 'src/students/students.module';
import { StudentsService } from 'src/students/students.service';

describe('RegistrationService Int', () => {
  let prisma: PrismaService;
  let registrationsService: RegistrationsService;
  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [RegistrationsModule, StudentsModule],
    }).compile();
    prisma = moduleRef.get(PrismaService);
    registrationsService = moduleRef.get(RegistrationsService);
    await prisma.cleanDatabase();
  });

  describe('registrations CRUD', () => {
    let newStudent: any;
    let newCourse: any;
    let newTeacher: any;
    let newClass: any;
    let newRegistration: any;
    it('should create a course', async () => {
      newCourse = await prisma.courses.create({
        data: {
          name: 'Curso 1',
          goal: 'Objetivo',
          information: 'Informações',
          requirements: 'Requisitos',
          duration: 40,
          price: 120.0,
        },
      });
    });

    it('should create a teacher', async () => {
      newTeacher = await prisma.teachers.create({
        data: {
          name: 'Professor 1',
          email: 'professor1@gmail.com',
          curriculum: 'Curriculo',
        },
      });
    });

    it('should create a class', async () => {
      newClass = await prisma.classes.create({
        data: {
          name: 'Turma 1',
          courseId: newCourse.id,
          information: 'Informações',
          location: 'Localização',
          startDate: new Date(),
          classTimes: 'Horarios das aulas',
          teacherId: newTeacher.id,
        },
      });
    });

    it('should create a student', async () => {
      newStudent = await prisma.students.create({
        data: {
          name: 'José da Silva',
          cpf: '082.123.135-33',
          email: 'jose@gmail.com',
          password: 'password',
        },
      });

      expect(newStudent.name).toBe('José da Silva');
    });

    it('should create a registration', async () => {
      newRegistration = await registrationsService.createRegistry({
        complete: false,
        studentId: newStudent.id,
        classId: newClass.id,
      });

      expect(newRegistration.studentId).toBe(newStudent.id);
    });

    it('should update registration complete status', async () => {
      const updatedRegistration = await registrationsService.update(
        newRegistration.id,
        { complete: true },
      );

      expect(updatedRegistration.complete).toBeTruthy();
    });

    it('should update many registrations status', async () => {
      const response = await registrationsService.updateMany([
        newRegistration.id,
      ]);

      expect(response.count).toBeGreaterThan(0);
    });

    it('should find a registration', async () => {
      const response = await registrationsService.findBy({
        where: { id: newRegistration.id },
      });

      expect(response.complete).toBeTruthy();
    });

    it('should remove registration', async () => {
      const response = await registrationsService.remove(newRegistration.id);
      expect(response).toBe('Successfuly removed!');
    });
  });

  it.todo('should pass Registrations test');
});
