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
import { ClassesService } from './classes.service';

@Controller('classes')
export class ClassesController {
  constructor(private readonly classesService: ClassesService) {}

  @UseGuards(AuthGuard('jwt-admin'))
  @Post()
  create(@Body() postData: Prisma.ClassesCreateInput) {
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

  @UseGuards(AuthGuard('jwt-admin'))
  @Patch(':id')
  update(@Param('id') id: string, @Body() postData: Prisma.ClassesUpdateInput) {
    return this.classesService.update(+id, postData);
  }

  @UseGuards(AuthGuard('jwt-admin'))
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.classesService.remove(+id);
  }
}
