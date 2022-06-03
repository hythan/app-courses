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
import { TeachersService } from './teachers.service';

@Controller()
export class TeachersController {
  constructor(private readonly teachersService: TeachersService) {}

  @Post()
  create(@Body() postData: Prisma.TeachersCreateInput) {
    return this.teachersService.create(postData);
  }

  @Get('admins/teachers/all')
  findAll() {
    return this.teachersService.findAll();
  }

  @UseGuards(AuthGuard('jwt1') || AuthGuard('jwt'))
  @Get('teachers/:id')
  findById(@Param('id') id: string) {
    return this.teachersService.findBy({ where: { id: Number(id) } });
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() postData: Prisma.TeachersUpdateInput,
  ) {
    return this.teachersService.update(+id, postData);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.teachersService.remove(+id);
  }
}
