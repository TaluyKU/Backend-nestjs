import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/models/user.schema';

import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel('User') private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  // async signUp(signUpDto: User): Promise<{ token: string }> {
  //   const { username, password } = signUpDto;

  //   const hashedPassword = await bcrypt.hash(password, 10);

  //   const user = await this.userModel.create({
  //     username,
  //     password: hashedPassword,
  //   });

  //   const token = this.jwtService.sign({ id: user._id });

  //   return { token };
  // }

}
