import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { RegistrationsService } from './registrations.service';
import { Prisma } from '@prisma/client';

@Controller('registrations')
export class RegistrationsController {
  constructor(private readonly registrationsService: RegistrationsService) {}

  @Post()
  async create(@Body() params: { studentId: string; classId: string }) {
    const data = {
      student: { connect: { id: +params.studentId } },
      class: { connect: { id: +params.classId } },
    };

    return this.registrationsService.createRegistry(data);
  }

  @Get()
  findAll() {
    return this.registrationsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.registrationsService.findBy({ where: { id: +id } });
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() postData: Prisma.RegistrationUpdateInput,
  ) {
    return this.registrationsService.update(+id, postData);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.registrationsService.remove(+id);
  }
}
