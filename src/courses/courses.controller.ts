import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';

@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) { }

  @Post()
  create(
    @Body()
    postData: {
      title: string;
      goal: string;
      information: string;
      duration: string;
    },
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
    postData: {
      title?: string;
      goal?: string;
      information?: string;
      duration?: string;
    },
  ) {
    return this.coursesService.update(+id, postData);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.coursesService.remove(+id);
  }
}
