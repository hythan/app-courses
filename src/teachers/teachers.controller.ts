import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AuthGuard } from '@nestjs/passport';
import { Prisma } from '@prisma/client';
import { TeachersService } from './teachers.service';

// @UseGuards(AuthGuard('jwt-admin'))
@Controller()
export class TeachersController {
  constructor(private readonly teachersService: TeachersService) {}

  @MessagePattern('create-teacher')
  async create(@Payload() payload: any) {
    return await this.teachersService.create(payload.data);
  }

  @MessagePattern('find-all-teachers')
  async findAll() {
    return this.teachersService.findAll();
  }

  @MessagePattern('find-teacher')
  async findById(@Payload() payload: any) {
    return this.teachersService.findBy({ where: { id: Number(payload.id) } });
  }

  @MessagePattern('update-teacher')
  async update(@Payload() payload: any) {
    return this.teachersService.update(payload.id, payload.data);
  }

  @MessagePattern('remove-teacher')
  async remove(@Payload() payload: any) {
    return this.teachersService.remove(payload.id);
  }
}
