import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { ClassesService } from './classes.service';

@Controller('classes')
export class ClassesController {
  constructor(private readonly classesService: ClassesService) {}

  @Post()
  create(@Body() postData: Prisma.ClassCreateInput) {
    postData.startDate = new Date(postData.startDate);
    return this.classesService.create(postData);
  }

  @Get()
  findAll() {
    return this.classesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.classesService.findBy({ where: { id: +id } });
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() postData: Prisma.ClassUpdateInput) {
    return this.classesService.update(+id, postData);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.classesService.remove(+id);
  }
}
