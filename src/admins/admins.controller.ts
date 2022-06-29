import { Body, Controller, Param, UseGuards } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AuthGuard } from '@nestjs/passport';
import { Prisma } from '@prisma/client';
import { AdminsService } from './admins.service';

@Controller('admins')
export class AdminsController {
  constructor(private readonly adminsService: AdminsService) {}

  @MessagePattern('create-admin')
  async create(@Payload() postData: any) {
    return await this.adminsService.create(postData.data);
  }

  @MessagePattern('create-admin')
  findAll() {
    return this.adminsService.all();
  }

  findOne(@Param('id') id: string) {
    return this.adminsService.findBy({ where: { id: Number(id) } });
  }

  update(
    @Param('id') id: string,
    @Body() updateData: Prisma.AdminsUpdateInput,
  ) {
    return this.adminsService.update(+id, updateData);
  }

  remove(@Param('id') id: string) {
    return this.adminsService.remove(Number(id));
  }
}
