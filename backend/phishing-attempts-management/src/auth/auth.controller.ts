import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterUserDto } from './dto/register.dto';
import { Public } from '../common/decorators/public.decorator';

@Public()
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() body: RegisterUserDto) {
    const { username, password } = body;
    return this.authService.register(username, password);
  }

  @Post('login')
  async login(@Body() body: RegisterUserDto) {
    const { username, password } = body;
    return this.authService.login(username, password);
  }
}
