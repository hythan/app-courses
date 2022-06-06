import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Prisma } from '@prisma/client';
import { TeachersService } from './teachers.service';

@UseGuards(AuthGuard('jwt-admin'))
@Controller('teachers')
export class TeachersController {
  constructor(private readonly teachersService: TeachersService) {}

  @Post()
  create(@Body() postData: Prisma.TeachersCreateInput) {
    return this.teachersService.create(postData);
  }

  @Get()
  findAll() {
    return this.teachersService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.teachersService.findBy({ where: { id: Number(id) } });
  }

  update(
    @Param('id') id: string,
    @Body() postData: Prisma.TeachersUpdateInput,
  ) {
    return this.teachersService.update(+id, postData);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.teachersService.remove(+id);
  }
}
