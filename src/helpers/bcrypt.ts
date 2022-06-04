import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class BcryptService {
  async encrypt(password: any) {
    const salt = bcrypt.genSaltSync();
    return bcrypt.hashSync(password, salt);
  }

  async decrypt(password: any, hash: any) {
    return bcrypt.compareSync(password, hash);
  }
}
