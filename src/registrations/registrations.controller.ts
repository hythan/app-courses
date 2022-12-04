import { Controller } from '@nestjs/common';
import { RegistrationsService } from './registrations.service';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class RegistrationsController {
  constructor(private readonly registrationsService: RegistrationsService) {}

  @MessagePattern('create-registration')
  async create(@Payload() payload: any) {
    return this.registrationsService.createRegistry(payload.data);
  }

  @MessagePattern('find-all-registrations')
  async findAll() {
    return await this.registrationsService.findAll();
  }

  @MessagePattern('find-registration')
  findOne(@Payload() payload: any) {
    return this.registrationsService.findBy({ where: { id: +payload.id } });
  }

  @MessagePattern('update-registration')
  async update(@Payload() payload: any) {
    const response = await this.registrationsService.update(
      payload.id,
      payload.data,
    );
    return response;
  }

  @MessagePattern('update-many-registrations')
  async updateMany(@Payload() payload: any) {
    return await this.registrationsService.updateMany(payload.ids);
  }

  @MessagePattern('remove-registration')
  remove(@Payload() payload: any) {
    return this.registrationsService.remove(payload.id);
  }
}
