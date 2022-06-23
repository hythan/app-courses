import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Inject,
} from '@nestjs/common';
import { RegistrationsService } from './registrations.service';
import { Prisma } from '@prisma/client';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ClientProxy } from '@nestjs/microservices';
import { ClassesService } from 'src/classes/classes.service';

@UseGuards(JwtAuthGuard)
@Controller('registrations')
export class RegistrationsController {
  constructor(
    private readonly registrationsService: RegistrationsService,
    private readonly classesService: ClassesService,
    // @Inject('REGISTRANTION_SERVICES') private readonly client: ClientProxy,
  ) {}

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
    // this.client.emit('all-certification', {});
    return this.registrationsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.registrationsService.findBy({ where: { id: +id } });
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() postData: Prisma.RegistrationsUpdateInput,
  ) {
    const response = await this.registrationsService.update(+id, postData);
    // if (response.complete) {
    //   const _response = response;
    //   const _class = await this.classesService.findBy({
    //     where: { id: response.classId },
    //   });
    //   _response.classId = _class.courseId;
    //   this.client.emit('create-or-update-certification', { data: _response });
    // }
    return response;
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.registrationsService.remove(+id);
  }
}
