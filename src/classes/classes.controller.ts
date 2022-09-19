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
import { ClassesService } from './classes.service';

@Controller('classes')
export class ClassesController {
  constructor(private readonly classesService: ClassesService) {}

  @MessagePattern('create-class')
  create(@Payload() payload: any) {
    payload.data.startDate = new Date(payload.data.startDate);
    return this.classesService.create(payload.data);
  }

  @MessagePattern('find-all-classes')
  findAll() {
    return this.classesService.findAll();
  }

  @MessagePattern('find-class')
  findOne(@Payload() payload: any) {
    return this.classesService.findBy({ where: { id: payload.id } });
  }

  @MessagePattern('update-class')
  update(@Payload() payload: any) {
    return this.classesService.update(payload.id, payload.data);
  }

  @MessagePattern('remove-class')
  remove(@Payload() payload: any) {
    return this.classesService.remove(payload.id);
  }
}
