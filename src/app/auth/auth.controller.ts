import { Logger, Body, Controller, Post, Req, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from 'src/models/user.schema';
import { registerDTO } from './dto/register.dto';
import { Request } from 'express';
import { userInfoDTO } from './dto/user.info.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  private readonly logger = new Logger(AuthController.name);

  @Post('/register')
  register(@Body() registerDto: registerDTO): Promise<{ token: string }> {
    return this.authService.register(registerDto);
  }

  @Post('/login')
  signIn(
    @Body('email') email: string,
    @Body('password') password: string,
  ): Promise<{ token: string }> {
    this.logger.log(`[POST] Login: ${email}`);
    return this.authService.login(email, password);
  }

  @Get('/get-user-info')
  async getUserInfo(@Req() req: Request): Promise<userInfoDTO> {
    const user = await this.authService.getUserInfo(req);
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      avatar: user.avatar,
      phone: user.phone,
    };
  }

  @Post('/update-user-info')
  async updateUserInfo(
    @Req() req: Request,
    @Body('name') name: string,
    @Body('phone') phone: string,
  ): Promise<void> {
    const updatedUser = await this.authService.updateUserInfo(req, name, phone);
  }
}
