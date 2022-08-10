import { Module } from '@nestjs/common';
import { BcryptService } from 'src/helpers/bcrypt.service';
import { ErrorsService } from './errors.service';

@Module({
  providers: [BcryptService, ErrorsService],
  exports: [BcryptService, ErrorsService],
})
export class HelpersModule {}
