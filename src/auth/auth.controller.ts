import { Controller, Post, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AdminAuthGuard } from './admin-auth.guard';
import { AuthService } from './auth.service';
import { StudentAuthGuard } from './student-auth.guard';

@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(AdminAuthGuard)
  @Post('admins/login')
  async loginAdmin(@Request() req) {
    return this.authService.login(req.user);
  }

  @UseGuards(StudentAuthGuard)
  @Post('students/login')
  async loginStudent(@Request() req) {
    return this.authService.login(req.user);
  }
}
