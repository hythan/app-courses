import { Test } from '@nestjs/testing';
import { AdminsModule } from 'src/admins/admins.module';
import { AdminsService } from 'src/admins/admins.service';
import { PrismaService } from 'src/prisma/prisma.service';

describe('AdminService Int', () => {
  let prisma: PrismaService;
  let adminService: AdminsService;
  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AdminsModule],
    }).compile();
    prisma = moduleRef.get(PrismaService);
    adminService = moduleRef.get(AdminsService);
    await prisma.cleanDatabase();
  });

  describe('admin CRUD', () => {
    it('should create admin', async () => {
      const admin = await adminService.create({
        name: 'John',
        email: 'john@gmail.com',
        password: 'abc123',
      });
      const admins = await adminService.all();
      expect(admin.email).toBe('john@gmail.com');
      expect(admins.length).toBe(1);
    });

    it('should not create duplicated email admin', async () => {
      const response: any = await adminService.create({
        name: 'John 2',
        email: 'john@gmail.com',
        password: 'abc123',
      });

      expect(response.error).toBe('This email already been registred.');
      const admins = await adminService.all();
      expect(admins.length).toBe(1);
    });

    it('should update admin', async () => {
      const admin = await adminService.create({
        name: 'John',
        email: 'john1@gmail.com',
        password: 'abc123',
      });

      const adminUpdated = await adminService.update(admin.id, {
        name: 'Pedro',
      });

      expect(adminUpdated.name).toBe('Pedro');
    });

    it('should delete admin', async () => {
      const admin = await adminService.create({
        name: 'Adan',
        email: 'adan@gmail.com',
        password: 'abc123',
      });

      await adminService.remove(admin.id);
      const response = await adminService.findBy({ where: { id: admin.id } });
      expect(response).toBeNull();
    });
  });

  it.todo('should pass');
});
