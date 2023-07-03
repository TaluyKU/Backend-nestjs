import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from 'src/models/user.schema';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  // @Post('/signup')
  // signUp(@Body() signUpDto: User): Promise<{ token: string }> {
  //   return this.authService.signUp(signUpDto);
  // }
}
