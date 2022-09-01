import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { StudentsService } from './students.service';

@Controller()
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}

  @MessagePattern('all-courses-students')
  async findAll() {
    return this.studentsService.all();
  }

  @MessagePattern('create-courses-student')
  async create(@Payload() payload: any) {
    const response = await this.studentsService.create(payload.data);
    return response;
  }

  @MessagePattern('find-courses-student')
  async findOne(@Payload() payload: any) {
    return this.studentsService.findBy({ where: payload.where });
  }

  @MessagePattern('update-courses-student')
  update(@Payload() payload: any) {
    return this.studentsService.update(payload.id, payload.data);
  }

  @MessagePattern('remove-courses-student')
  remove(@Payload() payload: any) {
    return this.studentsService.remove(Number(payload.id));
  }

  @MessagePattern('validate-courses-student')
  async validadeStudent(@Payload() payload: any) {
    return await this.studentsService.validadeStudentUser(
      payload.email,
      payload.password,
    );
  }
}
