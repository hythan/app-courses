import { Module } from '@nestjs/common';
import { RegistrationsService } from './registrations.service';
import { RegistrationsController } from './registrations.controller';
import { PrismaService } from 'src/prisma.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ClassesService } from 'src/classes/classes.service';

@Module({
  // imports: [
  //   ClientsModule.register([
  //     {
  //       name: 'REGISTRANTION_SERVICES',
  //       transport: Transport.RMQ,
  //       options: {
  //         urls: ['amqp://admin:admin@rabbitmq:5672'],
  //         queue: 'main_queue',
  //         queueOptions: {
  //           durable: false,
  //         },
  //       },
  //     },
  //   ]),
  // ],
  controllers: [RegistrationsController],
  providers: [RegistrationsService, PrismaService, ClassesService],
})
export class RegistrationsModule {}
