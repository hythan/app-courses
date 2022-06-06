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
import { CoursesService } from './courses.service';

@UseGuards(AuthGuard('jwt-admin'))
@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @Post()
  create(
    @Body()
    postData: Prisma.CoursesCreateInput,
  ) {
    return this.coursesService.create(postData);
  }

  @Get()
  findAll() {
    return this.coursesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.coursesService.findBy({ where: { id: Number(id) } });
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body()
    postData: Prisma.CoursesUpdateInput,
  ) {
    return this.coursesService.update(+id, postData);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.coursesService.remove(+id);
  }
}
