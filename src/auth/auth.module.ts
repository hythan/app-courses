import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AdminsModule } from 'src/admins/admins.module';
import { BcryptService } from 'src/helpers/bcrypt';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { AdminStrategy } from './admin.strategy';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { StudentsModule } from 'src/students/students.module';
import { StudentStrategy } from './student.strategy';

@Module({
  imports: [
    AdminsModule,
    StudentsModule,
    PassportModule,
    JwtModule.register({
      secret: process.env.SECRET_KEY,
      signOptions: { expiresIn: '3600s' },
    }),
  ],
  providers: [
    AuthService,
    BcryptService,
    AdminStrategy,
    StudentStrategy,
    JwtStrategy,
  ],
  controllers: [AuthController],
})
export class AuthModule {}
