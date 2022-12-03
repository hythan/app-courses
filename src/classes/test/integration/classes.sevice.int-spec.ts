import { Test } from '@nestjs/testing';
import { ClassesModule } from 'src/classes/classes.module';
import { ClassesService } from 'src/classes/classes.service';
import { PrismaService } from 'src/prisma/prisma.service';

describe('ClassesService Int', () => {
  let prisma: PrismaService;
  let classesService: ClassesService;
  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [ClassesModule],
    }).compile();
    prisma = moduleRef.get(PrismaService);
    classesService = moduleRef.get(ClassesService);
    await prisma.cleanDatabase();
  });

  describe('classes CRUD', () => {
    let newCourse: any;
    let newTeacher: any;
    let newClass: any;
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
      newClass = await classesService.create({
        name: 'Turma 1',
        courseId: newCourse.id,
        information: 'Informações',
        location: 'Localização',
        startDate: new Date(),
        classTimes: 'Horarios das aulas',
        teacherId: newTeacher.id,
      });

      expect(newClass.name).toBe('Turma 1');
    });

    it('should update a class', async () => {
      let updatedClass = await classesService.update(newClass.id, {
        name: 'Novo Nome',
      });
      updatedClass = await classesService.findBy({
        id: updatedClass.id,
      });
      expect(updatedClass.name).toBe('Novo Nome');
    });

    it('should list all classes', async () => {
      const classes = await classesService.findAll();
      expect(classes).toBeInstanceOf(Array);
      expect(classes.length).toBeGreaterThan(0);
    });

    it('should remove a class', async () => {
      const toBeRemoved = await classesService.create({
        name: 'Turma 2',
        courseId: newCourse.id,
        information: 'Informações 2',
        location: 'Localização 2',
        startDate: new Date(),
        classTimes: 'Horarios das aulas',
        teacherId: newTeacher.id,
      });

      const response = await classesService.remove(toBeRemoved.id);
      expect(response).toBe('Successfuly removed!');
    });

    it('should not create a class and throw a exception', async () => {
      await classesService
        .create({
          name: 'Turma 3',
          courseId: 100,
          information: 'Informações',
          location: 'Localização',
          startDate: new Date(),
          classTimes: 'Horarios das aulas',
          teacherId: 2000,
        })
        .catch((error) => {
          expect(error.status).toBe(403);
        });
    });
  });

  it.todo('should pass Classes test');
});
