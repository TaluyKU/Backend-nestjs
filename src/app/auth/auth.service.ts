import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/models/user.schema';

import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { HttpException, HttpStatus } from '@nestjs/common';
import { registerDTO } from './dto/register.dto';
import { Request } from 'express';

//TODO: Make refresh token
@Injectable()
export class AuthService {
  constructor(
    @InjectModel('User') private userModel: Model<User>,
    private jwtService: JwtService,
    private usersService: UsersService,
  ) {}

  private readonly logger = new Logger(AuthService.name);

  async register(registerDto: registerDTO): Promise<{ token: string }> {
    const { name, email, password, confirm_password } = registerDto;

    // Check if a user with the same email already exists
    const existingUser = await this.usersService.findUserByEmail(email);
    if (existingUser) {
      throw new HttpException('ชื่อผู้ใช้ถูกใช้ไปแล้ว', HttpStatus.BAD_REQUEST);
    }

    //check password equal to confirm_password
    if (password !== confirm_password) {
      throw new HttpException('รหัสผ่านไม่ตรงกัน', HttpStatus.BAD_REQUEST);
    }

    //TODO: add policy check and save to database
    //TODO: check empty variable in case someone send trough backend without frontend

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await this.userModel.create({
      email,
      password: hashedPassword,
      name,
      updatedAt: new Date(),
    });

    const token = this.jwtService.sign({ id: user._id });

    return { token };
  }

  //TODO: make login DTO and validate value
  async login(email: string, password: string): Promise<{ token: string }> {
    this.logger.debug(`[LOGIN] Login User: ${email}`);
    const user: User = await this.usersService.findUserByEmail(email);
    if (!user) {
      throw new HttpException('ไม่พบผู้ใช้งาน', HttpStatus.NOT_FOUND);
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new HttpException('รหัสผ่านผิด', HttpStatus.UNAUTHORIZED);
    }

    const token = this.jwtService.sign({ id: user._id });
    return { token };
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }

  async getUserInfo(request: Request): Promise<User> {
    const token = this.extractTokenFromHeader(request);
    // this.logger.debug(`[VALIDATE] Validate User: ${token}`);
    //Have token?
    if (!token) {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }

    const { id } = this.jwtService.decode(token);
    const user = await this.usersService.findUserById(id);
    //Have user?
    if (!user) {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }

    return user;
  }

  async updateUserInfo(request: Request, name: string, phone: string) {
    try {
      const token = this.extractTokenFromHeader(request);
      const { id } = this.jwtService.decode(token);
      const updatedUser = await this.usersService.updateUser(id, name, phone);
      return updatedUser;
    } catch (error) {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }
  }

  async updateAvatar(request: Request, avatar: string) {
    try {
      const token = this.extractTokenFromHeader(request);
      const { id } = this.jwtService.decode(token);
      const updatedUser = await this.usersService.updateAvatar(id, avatar);
    } catch (error) {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }
  }

  async checkAuth(request: Request): Promise<boolean> {
    this.logger.debug(`[AUTH] Check Auth`);
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      return false;
    }

    try {
      const { id } = this.jwtService.decode(token);
      const user = await this.usersService.findUserById(id);
      return !!user;
    } catch (error) {
      this.logger.error(`[AUTH] ${error}`);
      return false;
    }
  }
}
