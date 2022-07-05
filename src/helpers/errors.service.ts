import { Injectable } from '@nestjs/common';

@Injectable()
export class ErrorsService {
  CODES = ['P2002'];

  getErrorMessage(response) {
    if (response && this.CODES.includes(response.code)) {
      return { error: `This ${response.meta.target} already been registred.` };
    }

    return response.message;
  }
}
