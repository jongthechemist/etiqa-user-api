import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { User } from './user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { UserCreateDto } from './user.dto';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async create(userDto: UserCreateDto): Promise<User> {
    const user = new this.userModel(userDto);
    user.uuid = uuidv4();
    user.created = new Date();
    return user.save({ validateBeforeSave: true });
  }

  async getAll(): Promise<User[]> {
    const users = await this.userModel.find().sort({ created: 'desc' });
    return users;
  }

  async get(uuid: string): Promise<User> {
    const user = await this.userModel.findOne({ uuid });
    return user;
  }

  async edit(uuid: string, userDto: UserCreateDto): Promise<User> {
    const result = await this.userModel.update({ uuid }, userDto);
    if (result.n !== 1) {
      throw new Error('Error while saving user');
    }
    return this.get(uuid);
  }

  async delete(uuid: string) {
    const result = await this.userModel.deleteOne({ uuid });
    if (result.n !== 1) {
      throw new Error('Error while deleting user');
    }
    return true;
  }
}
