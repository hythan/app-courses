import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AdminsService } from './admins.service';

@Controller('admins')
export class AdminsController {
  constructor(private readonly adminsService: AdminsService) {}

  @Post()
  create(@Body() postData: { name: string; email: string; password: string }) {
    return this.adminsService.create(postData);
  }

  @Get()
  findAll() {
    return this.adminsService.all();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.adminsService.findBy({ where: { id: Number(id) } });
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateData: { name: string; email: string; password: string },
  ) {
    return this.adminsService.update(+id, updateData);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.adminsService.remove(Number(id));
  }
}
