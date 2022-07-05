import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AuthGuard } from '@nestjs/passport';
import { Prisma } from '@prisma/client';
import { StudentsService } from './students.service';

@Controller()
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}

  @MessagePattern('all-students')
  async findAll() {
    return this.studentsService.all();
  }

  @MessagePattern('create-student')
  async create(@Payload() payload: any) {
    const response = await this.studentsService.create(payload.data);
    return response;
  }

  @MessagePattern('find-student')
  async findOne(@Payload() payload: any) {
    return this.studentsService.findBy({ where: payload.where });
  }

  @MessagePattern('update-student')
  update(@Payload() payload: any) {
    return this.studentsService.update(payload.id, payload.data);
  }

  @MessagePattern('remove-student')
  remove(@Payload() payload: any) {
    return this.studentsService.remove(Number(payload.id));
  }

  @MessagePattern('validate-student')
  async validadeStudent(@Payload() payload: any) {
    return await this.studentsService.validadeStudentUser(
      payload.email,
      payload.password,
    );
  }
}
