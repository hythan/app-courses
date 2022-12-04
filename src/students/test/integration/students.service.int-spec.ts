import { Test } from '@nestjs/testing';
import { PrismaService } from 'src/prisma/prisma.service';
import { StudentsModule } from 'src/students/students.module';
import { StudentsService } from 'src/students/students.service';

describe('RegistrationService Int', () => {
  let prisma: PrismaService;
  let studentsService: StudentsService;
  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [StudentsModule],
    }).compile();
    prisma = moduleRef.get(PrismaService);
    studentsService = moduleRef.get(StudentsService);
    await prisma.cleanDatabase();
  });

  describe('students CRUD', () => {
    let newStudent: any;

    it('should create a student', async () => {
      newStudent = await studentsService.create({
        name: 'José da Silva',
        cpf: '082.123.135-33',
        email: 'jose@gmail.com',
        password: 'password',
      });

      expect(newStudent.name).toBe('José da Silva');
    });

    it('should update student', async () => {
      const updatedStudent = await studentsService.update(newStudent.id, {
        email: 'jose1@gmail.com',
      });

      expect(updatedStudent.email).toBe('jose1@gmail.com');
    });

    it('should validate student user', async () => {
      const response = await studentsService.validadeStudentUser(
        'jose1@gmail.com',
        'password',
      );

      expect(response).toBeInstanceOf(Object);
    });

    it('should not validate student user', async () => {
      const response = await studentsService.validadeStudentUser(
        'jose1111111@gmail.com',
        'password1',
      );

      expect(response).toBeNull();
    });

    it('should remove a student', async () => {
      const response = await studentsService.remove(newStudent.id);

      expect(response).toBe('Successfuly removed!');
    });
  });

  it.todo('should pass Students test');
});
