import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Inject,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { AuthGuard } from '@nestjs/passport';
import { Prisma } from '@prisma/client';
import { CoursesService } from './courses.service';

@UseGuards(AuthGuard('jwt-admin'))
@Controller('courses')
export class CoursesController {
  constructor(
    private readonly coursesService: CoursesService,
    // @Inject('COURSES_SERVICES') private readonly client: ClientProxy,
  ) {}

  @Post()
  async create(
    @Body()
    postData: Prisma.CoursesCreateInput,
  ) {
    const response = await this.coursesService.create(postData);
    // this.client.emit('create-course', response);
    return response;
  }

  @Get()
  findAll() {
    // this.client.emit('all-course', {});
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
    // this.client.emit('update-course', { id: id, data: postData });
    return this.coursesService.update(+id, postData);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    // this.client.emit('delete-course', +id);
    return this.coursesService.remove(+id);
  }
}
