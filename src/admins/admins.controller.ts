import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Prisma } from '@prisma/client';
import { AdminsService } from './admins.service';

@Controller('admins')
export class AdminsController {
  constructor(private readonly adminsService: AdminsService) {}

  @Post()
  create(@Body() postData: Prisma.AdminsCreateInput) {
    return this.adminsService.create(postData);
  }

  @UseGuards(AuthGuard('jwt'))
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
    @Body() updateData: Prisma.AdminsUpdateInput,
  ) {
    return this.adminsService.update(+id, updateData);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.adminsService.remove(Number(id));
  }
}
