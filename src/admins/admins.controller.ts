import { Body, Controller, Param, UseGuards } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AuthGuard } from '@nestjs/passport';
import { Prisma } from '@prisma/client';
import { AdminsService } from './admins.service';

@Controller()
export class AdminsController {
  constructor(private readonly adminsService: AdminsService) {}

  @MessagePattern('create-admin')
  async create(@Payload() postData: any) {
    return await this.adminsService.create(postData.data);
  }

  @MessagePattern('find-all-admins')
  findAll() {
    return this.adminsService.all();
  }

  @MessagePattern('find-admin')
  findOne(@Payload() postData: any) {
    return this.adminsService.findBy({ where: { id: Number(postData.id) } });
  }

  @MessagePattern('update-admin')
  update(@Payload() postData: any) {
    return this.adminsService.update(postData.id, postData.data);
  }

  @MessagePattern('remove-admin')
  remove(@Payload() postData: any) {
    return this.adminsService.remove(Number(postData.id));
  }
}
