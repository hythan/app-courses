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
import { RegistrationsService } from './registrations.service';
import { Prisma } from '@prisma/client';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ClassesService } from 'src/classes/classes.service';
import { MessagePattern, Payload } from '@nestjs/microservices';

// @UseGuards(JwtAuthGuard)
@Controller()
export class RegistrationsController {
  constructor(
    private readonly registrationsService: RegistrationsService,
    private readonly classesService: ClassesService,
  ) {}

  @MessagePattern('create-registration')
  async create(@Payload() payload: any) {
    const data = {
      student: { connect: { id: payload.data.studentId } },
      class: { connect: { id: payload.data.classId } },
    };

    return this.registrationsService.createRegistry(data);
  }

  @MessagePattern('find-all-registrations')
  async findAll() {
    return await this.registrationsService.findAll();
  }

  @MessagePattern('find-registration')
  findOne(@Param('id') id: string) {
    return this.registrationsService.findBy({ where: { id: +id } });
  }

  @MessagePattern('update-registration')
  async update(@Payload() payload: any) {
    const response = await this.registrationsService.update(
      payload.id,
      payload.data,
    );
    return response;
  }

  @MessagePattern('remove-registration')
  remove(@Payload() payload: any) {
    return this.registrationsService.remove(payload.id);
  }
}
