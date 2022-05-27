import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { StudentsService } from './students.service';

@Controller('students')
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}

  @Get()
  findAll() {
    return this.studentsService.all();
  }

  @Post()
  create(@Body() postData: Prisma.StudentCreateInput) {
    return this.studentsService.create(postData);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.studentsService.findBy({ where: { id: Number(id) } });
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateData: Prisma.StudentUpdateInput,
  ) {
    return this.studentsService.update(+id, updateData);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.studentsService.remove(Number(id));
  }
}
