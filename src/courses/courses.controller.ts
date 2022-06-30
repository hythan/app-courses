import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { Prisma } from '@prisma/client';
import { CoursesService } from './courses.service';

@Controller()
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @MessagePattern('create-student')
  async create(@Payload() payload: any) {
    const response = await this.coursesService.create(payload.data);
    return response;
  }

  @MessagePattern('all-students')
  async findAll() {
    return await this.coursesService.findAll();
  }

  @MessagePattern('find-student')
  async findOne(@Payload() payload: any) {
    return await this.coursesService.findBy({
      where: { id: Number(payload.id) },
    });
  }

  @MessagePattern('update-student')
  async update(@Payload() payload: any) {
    return await this.coursesService.update(payload.id, payload.data);
  }

  @MessagePattern('remove-student')
  async remove(@Payload() payload: any) {
    return await this.coursesService.remove(payload.id);
  }
}
