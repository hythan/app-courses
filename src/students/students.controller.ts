import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Patch,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ClientProxy, MessagePattern } from '@nestjs/microservices';
import { AuthGuard } from '@nestjs/passport';
import { Prisma } from '@prisma/client';
import { StudentsService } from './students.service';

@Controller('students')
export class StudentsController {
  constructor(
    private readonly studentsService: StudentsService,
  ) // @Inject('STUDENTS_SERVICE') private readonly client: ClientProxy,
  {}

  @UseGuards(AuthGuard('jwt-student'))
  @Get('/profile')
  findProfile(@Request() req) {
    return this.studentsService.getProfile(req);
  }

  @UseGuards(AuthGuard('jwt-student'))
  @Patch('/profile')
  updateProfile(
    @Request() req,
    @Body() updateData: Prisma.StudentsUpdateInput,
  ) {
    const id = this.studentsService._getUserId(req);
    // this.client.emit('update-student', { id: id, data: updateData });
    return this.studentsService.updateProfile(req, updateData);
  }

  @MessagePattern('all-courses-students')
  async findAll() {
    // this.client.emit('find-all-students', {});
    console.log('ENTROU NO DO COURSE!!!!');
    // return this.studentsService.all();
  }

  @Post()
  async create(@Body() postData: Prisma.StudentsCreateInput) {
    const response = await this.studentsService.create(postData);
    // this.client.emit('create-student', response);
    return response;
  }

  @UseGuards(AuthGuard('jwt-admin'))
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.studentsService.findBy({ where: { id: Number(id) } });
  }

  @UseGuards(AuthGuard('jwt-admin'))
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateData: Prisma.StudentsUpdateInput,
  ) {
    // this.client.emit('update-student', { id: id, data: updateData });
    return this.studentsService.update(+id, updateData);
  }

  @UseGuards(AuthGuard('jwt-admin'))
  @Delete(':id')
  remove(@Param('id') id: string) {
    // this.client.emit('delete-student', +id);
    return this.studentsService.remove(Number(id));
  }
}
