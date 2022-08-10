import { Test, TestingModule } from '@nestjs/testing';
import { Admins } from '@prisma/client';
import { AdminsController } from './admins.controller';
import { AdminsService } from './admins.service';

describe('AdminsController', () => {
  let adminsController: AdminsController;
  let adminsService: AdminsService;

  const adminsList: Admins[] = [
    {
      id: 1,
      name: 'admin',
      email: 'admin@admin.com',
      password: '123456',
      createAt: new Date(),
      updateAt: new Date(),
    },
    {
      id: 2,
      name: 'admin2',
      email: 'admin2@admin.com',
      password: '123456',
      createAt: new Date(),
      updateAt: new Date(),
    },
  ];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AdminsController],
      providers: [
        {
          provide: AdminsService,
          useValue: {
            create: jest.fn(),
            all: jest.fn().mockResolvedValue(adminsList),
            findBy: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    adminsController = module.get<AdminsController>(AdminsController);
    adminsService = module.get<AdminsService>(AdminsService);
  });

  it('should be defined', () => {
    expect(adminsController).toBeDefined();
    expect(adminsService).toBeDefined();
  });

  describe('findAll', () => {
    it('should return all admins', async () => {
      const result = await adminsController.findAll();

      expect(result).toEqual(adminsList);
      expect(typeof result).toEqual('object');
    });
  });
});
