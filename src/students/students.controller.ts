import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AuthGuard } from '@nestjs/passport';
import { Prisma } from '@prisma/client';
import { StudentsService } from './students.service';

@Controller()
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}

  // @UseGuards(AuthGuard('jwt-student'))
  // @Get('/profile')
  // findProfile(@Request() req) {
  //   return this.studentsService.getProfile(req);
  // }

  // @UseGuards(AuthGuard('jwt-student'))
  // @Patch('/profile')
  // updateProfile(
  //   @Request() req,
  //   @Body() updateData: Prisma.StudentsUpdateInput,
  // ) {
  //   const id = this.studentsService._getUserId(req);
  //   // this.client.emit('update-student', { id: id, data: updateData });
  //   return this.studentsService.updateProfile(req, updateData);
  // }

  @MessagePattern('all-students')
  async findAll() {
    return this.studentsService.all();
  }

  @MessagePattern('create-student')
  async create(@Payload() payload: any) {
    const response = await this.studentsService.create(payload.data);
    return response;
  }

  // @UseGuards(AuthGuard('jwt-admin'))
  @MessagePattern('find-student')
  async findOne(@Payload() payload: any) {
    return this.studentsService.findBy({ where: { id: Number(payload.id) } });
  }

  // @UseGuards(AuthGuard('jwt-admin'))
  @MessagePattern('update-student')
  update(@Payload() payload: any) {
    return this.studentsService.update(payload.id, payload.data);
  }

  // @UseGuards(AuthGuard('jwt-admin'))
  @MessagePattern('remove-student')
  remove(@Payload() payload: any) {
    return this.studentsService.remove(Number(payload.id));
  }
}
