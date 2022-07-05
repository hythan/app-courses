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

  @MessagePattern('create-course')
  async create(@Payload() payload: any) {
    const response = await this.coursesService.create(payload.data);
    return response;
  }

  @MessagePattern('find-all-courses')
  async findAll() {
    return await this.coursesService.findAll();
  }

  @MessagePattern('find-course')
  async findOne(@Payload() payload: any) {
    return await this.coursesService.findBy({
      where: { id: Number(payload.id) },
    });
  }

  @MessagePattern('update-course')
  async update(@Payload() payload: any) {
    return await this.coursesService.update(payload.id, payload.data);
  }

  @MessagePattern('remove-course')
  async remove(@Payload() payload: any) {
    return await this.coursesService.remove(payload.id);
  }
}
