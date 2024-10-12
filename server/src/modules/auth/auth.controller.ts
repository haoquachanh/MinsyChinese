import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dtos/login.dto';
import { User } from 'src/entities/user.entity';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() user: User): Promise<User> {
    return this.authService.register(user);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(
    @Body() credentials: LoginDto,
  ): Promise<{ access_token: string }> {
    return this.authService.login(credentials);
  }
}
