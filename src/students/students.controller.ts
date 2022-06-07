import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Prisma } from '@prisma/client';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { StudentsService } from './students.service';

@Controller('students')
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}

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
    return this.studentsService.updateProfile(req, updateData);
  }

  @UseGuards(AuthGuard('jwt-admin'))
  @Get()
  findAll() {
    return this.studentsService.all();
  }

  @Post()
  create(@Body() postData: Prisma.StudentsCreateInput) {
    return this.studentsService.create(postData);
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
    return this.studentsService.update(+id, updateData);
  }

  @UseGuards(AuthGuard('jwt-admin'))
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.studentsService.remove(Number(id));
  }
}
