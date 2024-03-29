import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/models/user.schema';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel('User')
    private readonly userModel: Model<User>,
  ) {}

  private readonly logger = new Logger(UsersService.name);

  async getAllUsers() {
    const allUsers = await this.userModel.find({ deletedAt: null }).exec();
    this.logger.debug(`[GET] Get all Users`);
    return allUsers;
  }

  async findUserByEmail(email: string) {
    const foundUser = await this.userModel
      .findOne({ email: email, deletedAt: null })
      .exec();
    this.logger.debug(`[GET] Find user By Email: ${email}`);
    return foundUser;
  }

  async findUserById(id: string) {
    const foundUser = await this.userModel
      .findOne({ _id: id, deletedAt: null })
      .exec();
    this.logger.debug(`[GET] Find user By Id: ${id}`);
    return foundUser;
  }

  async updateUser(id: string, name: string, phone: string) {
    const updateUser = await this.userModel
      .findOneAndUpdate(
        { _id: id, deletedAt: null },
        {
          name: name,
          phone: phone,
          updatedAt: new Date(),
        },
        { new: true },
      )
      .exec();
    this.logger.debug(`[UPDATE] Update User: ${id}`);
    this.logger.verbose(
      `[UPDATE] From ${updateUser} to name: ${name} phone: ${phone}`,
    );
  }

  async deleteUser(id: string) {
    const deletedUser = await this.userModel
      .findOne({ _id: id, deletedAt: null })
      .exec();
    this.logger.debug(`[DELETE] Delete User: ${id}`);
    return deletedUser;
  }

  async updateAvatar(id: string, avatar: string) {
    const updatedUser = await this.userModel
      .findOneAndUpdate(
        { _id: id, deletedAt: null },
        {
          avatar: avatar,
          updatedAt: new Date(),
        },
      )
      .exec();
    this.logger.debug(`[UPDATE] Update Profile Image: ${id}`);
    this.logger.verbose(`[UPDATE] From ${updatedUser.avatar} to ${avatar}`);
  }
}
