import { Test } from '@nestjs/testing';
import { PrismaService } from 'src/prisma/prisma.service';
import { TeachersModule } from 'src/teachers/teachers.module';
import { TeachersService } from 'src/teachers/teachers.service';

describe('RegistrationService Int', () => {
  let prisma: PrismaService;
  let teachersService: TeachersService;
  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [TeachersModule],
    }).compile();
    prisma = moduleRef.get(PrismaService);
    teachersService = moduleRef.get(TeachersService);
    await prisma.cleanDatabase();
  });

  describe('teachers CRUD', () => {
    let newTeacher: any;

    it('should create a teacher', async () => {
      newTeacher = await teachersService.create({
        name: 'Professor 1',
        email: 'professor1@gmail.com',
        curriculum: 'Curriculo',
      });

      expect(newTeacher.email).toBe('professor1@gmail.com');
    });

    it('should update a teacher', async () => {
      const updatedTeacher = await teachersService.update(newTeacher.id, {
        email: 'jose1@gmail.com',
      });

      expect(updatedTeacher.email).toBe('jose1@gmail.com');
    });

    it('should find a teacher', async () => {
      const response = await teachersService.findBy({
        where: { id: newTeacher.id },
      });

      expect(response.email).toBe('jose1@gmail.com');
    });

    it('should remove a teacher', async () => {
      const response = await teachersService.remove(newTeacher.id);

      expect(response).toBe('Successfuly removed!');
    });
  });

  it.todo('should pass Teachers test');
});
